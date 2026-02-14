import { Globe } from 'lucide-react';
import { useRegion } from '../context/RegionContext';
import { Region } from '../types';

export function RegionSelector() {
  const { region, setRegion } = useRegion();
  // State to track the selected US state
  const { selectedState, setSelectedState } = useRegion();

  const regions: { value: Region; label: string; flag: string }[] = [
    { value: 'finland', label: 'Finland', flag: '🇫🇮' },
    { value: 'usa', label: 'United States', flag: '🇺🇸' },
  ];

  // List of states from your research documentation
  const usStates = ['General', 'California', 'Georgia', 'Minnesota', 'Virginia', 'Texas', 'New York', 'Florida'];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Globe className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">
              Unified Cyber Resource Intelligence Platform
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="region" className="text-sm font-medium text-gray-700">Region:</label>
              <select
                id="region"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value as Region);
                  setSelectedState('General'); // Reset state on region change
                }}
                className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {regions.map((r) => (
                  <option key={r.value} value={r.value}>{r.flag} {r.label}</option>
                ))}
              </select>
            </div>

            {/* NEW: State Selector for USA */}
            {region === 'usa' && (
              <div className="flex items-center space-x-2">
                <label htmlFor="state" className="text-sm font-medium text-gray-700">State:</label>
                <select
                  id="state"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {usStates.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}