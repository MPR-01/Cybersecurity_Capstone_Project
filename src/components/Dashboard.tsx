import { AlertTriangle, Phone, ExternalLink, TrendingUp } from 'lucide-react';
import { useRegion } from '../context/RegionContext';
import { getAdvisories, getHelplines, getPortals } from '../services/dataLoader';
import { useMemo } from 'react';

export function Dashboard() {
  const { region } = useRegion();

  const stats = useMemo(() => {
    const advisories = getAdvisories(region);
    const helplines = getHelplines(region);
    const portals = getPortals(region);

    const criticalAdvisories = advisories.filter(a => a.severity === 'critical').length;
    const highAdvisories = advisories.filter(a => a.severity === 'high').length;
    const latestAdvisories = advisories.slice(0, 3);

    return {
      totalAdvisories: advisories.length,
      criticalAdvisories,
      highAdvisories,
      totalHelplines: helplines.length,
      totalPortals: portals.length,
      latestAdvisories
    };
  }, [region]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="mt-1 text-sm text-gray-600">
          Current region: {region === 'finland' ? 'Finland' : 'United States'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Advisories</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalAdvisories}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.criticalAdvisories}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Helplines</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalHelplines}</p>
            </div>
            <Phone className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Official Portals</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalPortals}</p>
            </div>
            <ExternalLink className="w-10 h-10 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Latest Advisories</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {stats.latestAdvisories.map((advisory) => (
            <div key={advisory.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900">{advisory.title}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      advisory.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      advisory.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      advisory.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {advisory.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{advisory.summary}</p>
                  <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                    <span>{advisory.source}</span>
                    <span>{new Date(advisory.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <a
                  href={advisory.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
