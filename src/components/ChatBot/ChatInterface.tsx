import { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, Loader, Trash2, Download } from 'lucide-react';
import { useRegion } from '../../context/RegionContext';
import { ChatMessage as ChatMessageType } from '../../types';
import { ChatMessage } from './ChatMessage';
import { sendToGemini } from '../../services/gemini';

export function ChatInterface() {
  const { region } = useRegion();
  const initialMessage: ChatMessageType = {
    role: 'assistant',
    content: `Hello! I'm your cybersecurity incident guidance assistant for ${region === 'finland' ? 'Finland' : 'the United States'}.\n\nI can help you:\n- Understand what type of cyber incident you're experiencing\n- Assess the urgency of your situation\n- Guide you to the right authorities and portals\n- Provide step-by-step instructions\n\nPlease describe your cybersecurity concern, and I'll help you navigate to the appropriate resources.`,
    timestamp: Date.now(),
  };

  const [messages, setMessages] = useState<ChatMessageType[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([initialMessage]);
  }, [region]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendToGemini({
        message: input.trim(),
        region,
      });

      const assistantMessage: ChatMessageType = {
        role: 'assistant',
        content: response.response,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessageType = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please ensure your Gemini API key is configured correctly in the .env file, or try again later.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([initialMessage]);
  };

  const exportChat = () => {
    const transcript = messages
      .map((m) => `[${new Date(m.timestamp).toLocaleTimeString()}] ${m.role.toUpperCase()}: ${m.content}`)
      .join('\n\n');
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cyber_Incident_Guidance_${region}_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Incident Guidance Assistant</h2>
          <p className="mt-1 text-sm text-gray-600">
            Get personalized guidance for your cybersecurity incident
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={exportChat}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition-colors"
            title="Export chat transcript"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={clearChat}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-white border border-red-200 rounded-md hover:bg-red-50 text-red-600 transition-colors"
            title="Clear chat history"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Important:</strong> This chatbot provides guidance only and is not a substitute for professional advice. For immediate emergencies, contact appropriate authorities directly.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col" style={{ height: '600px' }}>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <Loader className="w-5 h-5 text-white animate-spin" />
              </div>
              <div className="bg-gray-100 rounded-lg px-4 py-3">
                <p className="text-sm text-gray-600">Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your cybersecurity concern..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
