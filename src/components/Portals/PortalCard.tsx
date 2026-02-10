import { ExternalLink, Shield } from 'lucide-react';
import { Portal } from '../../types';

interface PortalCardProps {
  portal: Portal;
}

export function PortalCard({ portal }: PortalCardProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{portal.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{portal.authority}</p>

          <p className="text-sm text-gray-700 mb-4">{portal.description}</p>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Handles:</p>
            <div className="flex flex-wrap gap-2">
              {portal.incidentTypes.map((type) => (
                <span
                  key={type}
                  className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
                >
                  {type.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>

          <a
            href={portal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <span>Visit Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
