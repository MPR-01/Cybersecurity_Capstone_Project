# Unified Cyber Resource Intelligence Platform

An academic capstone project providing region-aware cybersecurity incident guidance, official portal mapping, and AI-assisted decision support.

## Project Overview

This platform helps the general public understand cybersecurity incidents, access correct official portals and helplines, and receive guided assistance through a web interface and chatbot.

### Key Features

1. **Region-Based Platform** - Content dynamically updates based on selected region (Finland, USA)
2. **Advisories & Articles** - Aggregated official cybersecurity advisories with filtering and sorting
3. **Emergency Helplines** - Comprehensive list of cybercrime-related helplines per region
4. **Portal Mapping** - Structured mapping of cyber incident types to correct authorities
5. **Guidance Chatbot** - AI-powered assistant using Google Gemini API for incident routing
6. **Ethics & Compliance** - Transparent documentation of data handling and limitations

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Gemini API
- **Data Storage**: Flat JSON files (no database)
- **Deployment**: Vercel-compatible

## Project Structure

```
src/
├── components/
│   ├── Articles/          # Advisory listing and filtering
│   ├── Helplines/         # Emergency helpline information
│   ├── Portals/           # Portal mapping interface
│   ├── Chatbot/           # AI guidance assistant
│   ├── Dashboard.tsx      # Main dashboard with widgets
│   ├── RegionSelector.tsx # Region selection header
│   ├── Navigation.tsx     # Main navigation
│   └── Ethics.tsx         # Ethics & compliance section
├── context/
│   └── RegionContext.tsx  # Global region state
├── data/
│   ├── finland/           # Finland-specific data
│   ├── usa/               # USA-specific data
│   └── mapping.json       # Incident type to portal mapping
├── services/
│   ├── dataLoader.ts      # JSON data loading utilities
│   └── gemini.ts          # Gemini API integration
└── types/
    └── index.ts           # TypeScript type definitions
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Add your Gemini API key:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## Usage

1. **Select Region**: Choose your region (Finland or USA) from the header
2. **Navigate**: Use the navigation menu to explore different sections
3. **View Dashboard**: See overview statistics and latest advisories
4. **Browse Advisories**: Filter and sort cybersecurity advisories
5. **Find Helplines**: Access emergency contact information
6. **Check Portal Mapping**: Understand which authority handles which incident type
7. **Use Chatbot**: Get personalized guidance for your specific incident
8. **Review Ethics**: Understand data handling and limitations

## Chatbot Features

The AI-powered guidance assistant:
- Asks clarifying questions to understand your situation
- Identifies the type of cyber incident
- Assesses urgency level
- Routes you to appropriate authorities
- Provides step-by-step guidance
- Politely declines non-cybersecurity queries
- Operates statelessly (no conversation memory)

## Data Sources

All information is sourced from official authorities:

### Finland
- National Cyber Security Centre Finland (Traficom)
- Finnish Police
- Data Protection Ombudsman
- Financial Supervisory Authority

### USA
- CISA (Cybersecurity & Infrastructure Security Agency)
- FBI IC3 (Internet Crime Complaint Center)
- FTC (Federal Trade Commission)
- US-CERT
- United States Secret Service

## Ethics & Compliance

- **No personal data collection or storage**
- **No user authentication or tracking**
- **Stateless chatbot (no conversation retention)**
- **All data from official government sources**
- **Manual refresh mechanism (no automated scraping)**
- **GDPR compliant**
- **For guidance only, not emergency response**

## Important Disclaimers

⚠️ **This platform is NOT an emergency service**
- For immediate danger, contact emergency services directly
- This platform provides guidance and routing information only
- Not a substitute for professional cybersecurity advice
- Verify all information with official authorities

## Academic Purpose

This project was developed as an academic capstone to demonstrate:
- Integration of cybersecurity resources
- Region-aware content delivery
- AI-assisted decision support
- Ethical data handling practices
- Professional UI/UX design

## Development

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Manual Data Refresh

Use the "Refresh Data" buttons in each section to manually reload data from JSON files. This simulates data updates without automated scraping.

## Deployment

The project is designed for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Add `VITE_GEMINI_API_KEY` to Vercel environment variables
3. Deploy

## Future Enhancements

- Additional regions (EU countries, Canada, etc.)
- Multi-language support
- Advanced incident classification
- Historical trend analysis
- Mobile app version

## License

Academic project - For educational purposes only

## Contact

For questions about this project, please refer to the academic institution contact information.
