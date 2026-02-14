import { useState } from 'react';
import { useRegion } from '../../context/RegionContext';
import { getIncidentMappings, getPortalById } from '../../services/dataLoader';
import { PortalCard } from './PortalCard';
import { 
   MousePointer2, ShieldAlert, 
  Landmark, UserX, AlertTriangle, RefreshCw, 
  ChevronUp, ChevronDown 
} from 'lucide-react';

export function PortalMapping() {
  const { region } = useRegion();
  const mappings = getIncidentMappings(region);
  const [expandedMapping, setExpandedMapping] = useState<string | null>(null);
  
  // 1. New State for filtering
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 2. Filter logic: matches the icon ID to the incidentType in your data
  const filteredMappings = selectedCategory 
    ? mappings.filter(m => m.incidentType.toLowerCase().includes(selectedCategory.toLowerCase()))
    : mappings;

  const handleRefresh = () => {
    window.location.reload();
  };

  const toggleMapping = (incidentType: string) => {
    setExpandedMapping(expandedMapping === incidentType ? null : incidentType);
  };

  const urgencyColors = {
    immediate: 'bg-red-100 text-red-800 border-red-300',
    urgent: 'bg-orange-100 text-orange-800 border-orange-300',
    normal: 'bg-blue-100 text-blue-800 border-blue-300',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Incident Portal Mapping</h2>
            <p className="mt-1 text-sm text-gray-600">
              Find the right authority for your cyber incident
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* --- Reporting Wizard Section --- */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Quick Incident Wizard: What happened?</h3>
          {selectedCategory && (
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Reset Filter
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'phishing', label: 'Phishing/Email Scam', icon: MousePointer2, color: 'text-blue-600', bg: 'bg-blue-50' },
            { id: 'fraud', label: 'Money Loss/Fraud', icon: Landmark, color: 'text-green-600', bg: 'bg-green-50' },
            { id: 'breach', label: 'Data Breach', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
            { id: 'identity', label: 'Identity Theft', icon: UserX, color: 'text-purple-600', bg: 'bg-purple-50' }
          ].map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              className={`flex flex-col items-center p-4 border rounded-lg transition-all duration-200 ${
                selectedCategory === cat.id 
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100' 
                : 'border-gray-100 bg-white hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className={`${cat.bg} p-3 rounded-full mb-2`}>
                <cat.icon className={`w-6 h-6 ${cat.color}`} />
              </div>
              <span className={`text-xs font-semibold text-center ${selectedCategory === cat.id ? 'text-blue-700' : 'text-gray-700'}`}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-400 italic text-center">
          {selectedCategory 
            ? `Showing portals related to ${selectedCategory}. Click icon again to reset.` 
            : `Identify your incident type to find the correct ${region === 'finland' ? 'Finnish' : 'U.S.'} reporting portal below.`}
        </p>
      </div>

      {/* Main Mapping List - uses filteredMappings instead of mappings */}
      <div className="space-y-4">
        {filteredMappings.length > 0 ? (
          filteredMappings.map((mapping) => {
            const isExpanded = expandedMapping === mapping.incidentType;
            const portals = mapping.portalIds
              .map(id => getPortalById(region, id))
              .filter((p): p is NonNullable<typeof p> => p !== undefined);

            return (
              <div key={mapping.incidentType} className="bg-white rounded-lg shadow border border-gray-200">
                <button
                  onClick={() => toggleMapping(mapping.incidentType)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <AlertTriangle className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {mapping.incidentType.replace('_', ' ')}
                      </h3>
                      <p className="text-sm text-gray-600">{mapping.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${urgencyColors[mapping.urgencyLevel as keyof typeof urgencyColors]}`}>
                      {mapping.urgencyLevel.toUpperCase()}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-200">
                    <div className="mt-4 mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Recommended Actions:</h4>
                      <ol className="list-decimal list-inside space-y-1">
                        {mapping.guidanceSteps.map((step, index) => (
                          <li key={index} className="text-sm text-gray-700">{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Responsible Authorities:</h4>
                      <div className="space-y-4">
                        {portals.map(portal => (
                          <PortalCard key={portal.id} portal={portal} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No specific portals found for this category in {region}.</p>
            <button onClick={() => setSelectedCategory(null)} className="mt-2 text-blue-600 font-medium">Clear filter</button>
          </div>
        )}
      </div>
    </div>
  );
}
