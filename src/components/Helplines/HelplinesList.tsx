import { useRegion } from '../../context/RegionContext';
import { getHelplines } from '../../services/dataLoader';
import { HelplineCard } from './HelplineCard';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function HelplinesList() {
  const { region } = useRegion();
  const helplines = getHelplines(region);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Emergency Helplines</h2>
            <p className="mt-1 text-sm text-gray-600">
              Critical contact information for cybersecurity incidents
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

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Important:</strong> In case of immediate danger or active cyberattack, contact emergency services first. These helplines are for reporting and guidance, not emergency response.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {helplines.map(helpline => (
          <HelplineCard key={helpline.id} helpline={helpline} />
        ))}
      </div>
    </div>
  );
}
