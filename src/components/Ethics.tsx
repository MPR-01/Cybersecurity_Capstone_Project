import { Shield, Database, Scale, AlertTriangle } from 'lucide-react';

export function Ethics() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Ethics & Compliance</h2>
        <p className="mt-1 text-sm text-gray-600">
          Our commitment to ethical data handling and transparency
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Database className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Source Credibility</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  All information presented on this platform is sourced exclusively from official government and recognized cybersecurity authorities:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Finland: National Cyber Security Centre Finland (Traficom), Finnish Police, Data Protection Ombudsman</li>
                  <li>USA: CISA, FBI IC3, FTC, US-CERT, and other federal agencies</li>
                  <li>No third-party or unverified sources are used</li>
                  <li>All portal links direct users to official government websites</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ethical Data Collection</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  Our platform adheres to strict ethical guidelines for data handling:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>No personal data is collected or stored</li>
                  <li>No user authentication or tracking mechanisms</li>
                  <li>No cookies or persistent identifiers</li>
                  <li>Data aggregation is done manually through official channels only</li>
                  <li>All scraping activities respect robots.txt and terms of service</li>
                  <li>Manual refresh mechanism prevents server overload</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Scale className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy & Legal Limitations</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  We are committed to protecting user privacy and operating within legal boundaries:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>This platform is for informational and guidance purposes only</li>
                  <li>We do not provide legal advice or guarantees</li>
                  <li>Users are encouraged to contact official authorities directly for their specific situations</li>
                  <li>No incident reports are stored on our servers</li>
                  <li>Chatbot conversations are stateless and not retained</li>
                  <li>Compliance with GDPR and applicable data protection regulations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Disclaimer</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-semibold text-red-600">
                  IMPORTANT: This platform is NOT an emergency service.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>In case of immediate danger or active cyberattack, contact emergency services directly</li>
                  <li>For critical infrastructure incidents, use official emergency hotlines</li>
                  <li>This platform provides guidance and routing information only</li>
                  <li>Response times may vary; do not rely solely on this platform for urgent matters</li>
                  <li>Always verify information with official authorities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Academic Purpose</h3>
          <p className="text-sm text-gray-700">
            This platform was developed as an academic capstone project to demonstrate the integration of
            cybersecurity resources, data aggregation, and AI-assisted guidance systems. While built with
            professional standards and ethical considerations, it is intended for educational purposes and
            to showcase technical capabilities in the cybersecurity domain.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Transparency Commitment</h3>
          <p className="text-sm text-gray-700">
            We are committed to full transparency in our operations. All data sources are clearly attributed,
            methodology is documented, and limitations are openly communicated. Users have the right to verify
            any information independently through the official portals we reference.
          </p>
        </div>
      </div>
    </div>
  );
}
