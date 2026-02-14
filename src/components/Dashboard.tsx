import { AlertTriangle, Phone, ExternalLink, TrendingUp, ShieldCheck, CloudSun } from 'lucide-react';
import { useRegion } from '../context/RegionContext';
import { getAdvisories, getHelplines, getPortals } from '../services/dataLoader';
import { useMemo } from 'react';

export function Dashboard() {
  const { region, selectedState } = useRegion();

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
      latestAdvisories,
      // Simulated trend data based on region metadata
      trend: region === 'finland' ? 'Stable' : 'Increasing'
    };
  }, [region]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="mt-1 text-sm text-gray-600">
            Current region: {region === 'finland' ? 'Finland' : 'United States'}
          </p>
        </div>

        {/* Cyber Weather / Status Indicator */}
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
          {region === 'finland' ? <CloudSun className="text-blue-500 w-5 h-5" /> : <ShieldCheck className="text-green-500 w-5 h-5" />}
          <span className="text-sm font-medium">Status: {region === 'finland' ? 'Cyber Weather Fair' : 'Normal Operations'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Regional Cyber Weather Widget */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">Regional Cyber Weather</h3>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                  {region === 'finland' ? 'Fair' : 'Normal'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-600">
                  {region === 'finland' ? 'Current: Calm' : 'US-CERT: Level 1'}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
            </div>
            <p className="text-[10px] text-gray-400 italic">Source: {region === 'finland' ? 'NCSC-FI' : 'CISA/MS-ISAC'}</p>
          </div>
        </div>

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

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Incident Trend</p>
              <p className="text-xl font-bold text-gray-900 mt-2">{stats.trend}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* State Compliance Notice - Only visible when region is USA */}
      {region === 'usa' && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
          <h4 className="text-sm font-bold text-blue-900 uppercase">
            Compliance Notice: {selectedState}
          </h4>
          <p className="text-sm text-blue-800 mt-1">
            {selectedState === 'Virginia' ? (
              "CRITICAL: Virginia law requires public agencies to report incidents to the Fusion Center within 24 hours."
            ) : selectedState === 'Minnesota' ? (
              "MANDATE: Minnesota government entities must report security breaches to MNIT within 72 hours."
            ) : selectedState === 'Georgia' ? (
              "PROCEDURE: Report incidents via the State Cybersecurity Portal (SCP) managed by GEMA/HS."
            ) : (
              "Standard Procedure: Report general cybercrime incidents to the FBI Internet Crime Complaint Center (IC3)."
            )}
          </p>
        </div>
      )}
      {/* Latest Advisories Section */}
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
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${advisory.severity === 'critical' ? 'bg-red-100 text-red-800' :
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
