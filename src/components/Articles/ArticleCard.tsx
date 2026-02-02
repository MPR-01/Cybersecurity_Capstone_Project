import { ExternalLink } from 'lucide-react';
import { Advisory } from '../../types';

interface ArticleCardProps {
  advisory: Advisory;
}

export function ArticleCard({ advisory }: ArticleCardProps) {
  const severityColors = {
    critical: 'bg-red-100 text-red-800 border-red-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-blue-100 text-blue-800 border-blue-300',
  };

  const typeLabels = {
    government_advisory: 'Government Advisory',
    awareness: 'Awareness',
    incident: 'Incident Report',
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${severityColors[advisory.severity]}`}>
            {advisory.severity.toUpperCase()}
          </span>
          <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
            {typeLabels[advisory.type]}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{advisory.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{advisory.summary}</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="space-y-1">
          <p className="font-medium">{advisory.source}</p>
          <p>{new Date(advisory.date).toLocaleString()}</p>
        </div>
        <a
          href={advisory.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium"
        >
          <span>View Details</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
