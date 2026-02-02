import { useState } from 'react';
import { RegionProvider } from './context/RegionContext';
import { RegionSelector } from './components/RegionSelector';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { ArticlesList } from './components/Articles/ArticlesList';
import { HelplinesList } from './components/Helplines/HelplinesList';
import { PortalMapping } from './components/Portals/PortalMapping';
import { ChatInterface } from './components/Chatbot/ChatInterface';
import { Ethics } from './components/Ethics';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'advisories':
        return <ArticlesList />;
      case 'helplines':
        return <HelplinesList />;
      case 'portals':
        return <PortalMapping />;
      case 'chatbot':
        return <ChatInterface />;
      case 'ethics':
        return <Ethics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <RegionProvider>
      <div className="min-h-screen bg-gray-50">
        <RegionSelector />
        <Navigation activeView={activeView} onNavigate={setActiveView} />
        <main>{renderView()}</main>
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-gray-600">
              Unified Cyber Resource Intelligence Platform - Academic Capstone Project
            </p>
            <p className="text-center text-xs text-gray-500 mt-2">
              For educational purposes. Not a substitute for professional cybersecurity advice.
            </p>
          </div>
        </footer>
      </div>
    </RegionProvider>
  );
}

export default App;
