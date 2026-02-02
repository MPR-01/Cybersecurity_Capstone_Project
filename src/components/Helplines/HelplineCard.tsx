import { Phone, Clock, AlertCircle } from 'lucide-react';
import { Helpline } from '../../types';

interface HelplineCardProps {
  helpline: Helpline;
}

export function HelplineCard({ helpline }: HelplineCardProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Phone className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{helpline.name}</h3>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Purpose:</p>
              <p className="text-sm text-gray-600">{helpline.purpose}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>Contact:</span>
              </p>
              <p className="text-sm text-gray-900 font-mono">{helpline.contact}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>When to Use:</span>
              </p>
              <p className="text-sm text-gray-600">{helpline.whenToUse}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Availability:</span>
              </p>
              <p className="text-sm text-gray-600">{helpline.availability}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
