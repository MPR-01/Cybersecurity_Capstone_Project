import { Shield, Database, Scale, AlertTriangle, Cpu } from 'lucide-react';

export function Ethics() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Ethics & Compliance</h2>
        <p className="mt-1 text-sm text-gray-600">
          Our commitment to ethical data handling, transparency, and automated integrity.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Data Credibility */}
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
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                  <li><strong>Finland:</strong> NCSC-FI (Traficom), Finnish Police, Data Protection Ombudsman.</li>
                  <li><strong>USA:</strong> CISA, FBI IC3, FTC, and MS-ISAC.</li>
                  <li>No third-party, unverified, or crowdsourced data is used to ensure maximum reliability for victims.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Technical Scraping & OSINT Architecture */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Cpu className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Scraping & OSINT Pipeline</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>The platform implements an <strong>OSINT (Open Source Intelligence)</strong> pipeline designed for high-integrity data aggregation while maintaining ethical "politeness":</p>
                
                
                
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li><strong>Automated Monitoring:</strong> Targets RSS feeds and newsrooms (CISA/NCSC-FI) to detect new advisories in real-time.</li>
                  <li><strong>Normalization Logic:</strong> Raw HTML is parsed and converted into a structured JSON format to maintain a unified UI across regions.</li>
                  <li><strong>Ethical Politeness:</strong> Adheres to <code>robots.txt</code> protocols with implemented rate-limiting (max 1 request per 2 seconds) and User-Agent identification.</li>
                  <li><strong>Human-Like Behavior:</strong> Employs random delays to respect server capacity of government resources.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Ethical Data Handling */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy & Ethical Handling</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Our platform adheres to strict ethical guidelines for data handling:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Zero Data Retention:</strong> No personal data, cookies, or persistent identifiers are collected.</li>
                  <li><strong>Anonymity:</strong> Chatbot conversations are stateless and wiped upon session end or when the "Clear" button is used.</li>
                  <li><strong>Official Routing:</strong> The platform acts as a bridge; all actual incident reporting occurs on official government secure portals.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Privacy & Legal */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Scale className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy & Legal Limitations</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>We are committed to protecting user privacy and operating within legal boundaries:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Informational and guidance purposes only; not a substitute for legal advice.</li>
                  <li>AI-generated guidance should be verified with official authorities.</li>
                  <li>No incident reports are stored on our servers to mitigate data breach risks.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Emergency Disclaimer */}
        <div className="bg-white rounded-lg shadow border-2 border-red-100 p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-600 mb-2 uppercase">Emergency Disclaimer</h3>
              <div className="space-y-2 text-sm text-gray-700 font-medium">
                <p>IMPORTANT: This platform is NOT an emergency service.</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Immediate Danger: Contact emergency services (<strong>112</strong> in Finland, <strong>911</strong> in USA).</li>
                  <li>Always verify time-sensitive mandates (e.g., 24h reporting) via official state portals.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Purpose */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Academic Purpose</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            This platform was developed as an academic capstone project to demonstrate the integration of
            cybersecurity resources, data aggregation, and AI-assisted guidance systems. While built with
            professional standards, it is intended for educational purposes and to showcase technical capabilities in 
            OSINT research and automated data integrity.
          </p>
        </div>
      </div>
    </div>
  );
}
