import { useState } from 'react';
import { useRegion } from '../../context/RegionContext';
import { getIncidentMappings, getPortalById } from '../../services/dataLoader';
import { PortalCard } from './PortalCard';
import { AlertTriangle, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

export function PortalMapping() {
  const { region } = useRegion();
  const mappings = getIncidentMappings(region);
  const [expandedMapping, setExpandedMapping] = useState<string | null>(null);

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

      <div className="space-y-4">
        {mappings.map((mapping) => {
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
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${urgencyColors[mapping.urgencyLevel]}`}>
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
        })}
      </div>
    </div>
  );
}
