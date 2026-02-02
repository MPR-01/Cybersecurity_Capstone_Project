import { Region } from '../types';
import { getIncidentMappings, getPortalById } from './dataLoader';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export interface GeminiRequest {
  message: string;
  region: Region;
}

export interface GeminiResponse {
  response: string;
  suggestedPortals?: string[];
  urgencyLevel?: string;
}

function buildSystemPrompt(region: Region): string {
  const mappings = getIncidentMappings(region);

  const incidentTypes = mappings.map(m =>
    `- ${m.incidentType}: ${m.description}`
  ).join('\n');

  return `You are a cybersecurity incident guidance assistant for ${region.toUpperCase()}.

CRITICAL RULES:
1. You ONLY help with cybersecurity incidents, threats, and related guidance
2. You MUST politely decline any non-cybersecurity questions
3. You have NO conversation memory - treat each request independently
4. You MUST NOT provide legal advice or guarantee outcomes
5. You should ask clarifying questions to identify the incident type
6. You should assess urgency and route users to appropriate authorities

Available incident types in this region:
${incidentTypes}

Your role is to:
- Ask clarifying questions to understand the situation
- Identify the type of cybersecurity incident
- Assess urgency (immediate, urgent, normal)
- Provide step-by-step guidance
- Route users to the correct portals and helplines

If the user's question is not related to cybersecurity, politely say: "I can only assist with cybersecurity incidents and related questions. Please ask about cyber threats, data breaches, fraud, or other cybersecurity concerns."

Always be helpful, professional, and focused on user safety.`;
}

export async function sendToGemini(request: GeminiRequest): Promise<GeminiResponse> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  const systemPrompt = buildSystemPrompt(request.region);

  const fullPrompt = `${systemPrompt}

User question: ${request.message}

Provide helpful guidance. If you can identify the incident type, suggest the appropriate actions and portals.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I could not process your request. Please try again.';

    return {
      response: responseText
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

export function analyzeIncidentFromMessage(message: string, region: Region): {
  detectedType?: string;
  confidence: number;
  suggestedPortalIds: string[];
} {
  const messageLower = message.toLowerCase();
  const mappings = getIncidentMappings(region);

  let bestMatch: { type: string; confidence: number; portalIds: string[] } | null = null;

  for (const mapping of mappings) {
    const keywords = mapping.incidentType.split('_');
    let matchCount = 0;

    for (const keyword of keywords) {
      if (messageLower.includes(keyword)) {
        matchCount++;
      }
    }

    if (messageLower.includes(mapping.incidentType.replace('_', ' '))) {
      matchCount += 2;
    }

    const confidence = matchCount / (keywords.length + 1);

    if (!bestMatch || confidence > bestMatch.confidence) {
      bestMatch = {
        type: mapping.incidentType,
        confidence,
        portalIds: mapping.portalIds
      };
    }
  }

  return {
    detectedType: bestMatch && bestMatch.confidence > 0.3 ? bestMatch.type : undefined,
    confidence: bestMatch?.confidence || 0,
    suggestedPortalIds: bestMatch?.portalIds || []
  };
}
