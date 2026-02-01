interface NavigationProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export function Navigation({ activeView, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'advisories', label: 'Advisories' },
    { id: 'helplines', label: 'Helplines' },
    { id: 'portals', label: 'Portal Mapping' },
    { id: 'chatbot', label: 'Guidance Assistant' },
    { id: 'ethics', label: 'Ethics & Compliance' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeView === item.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
