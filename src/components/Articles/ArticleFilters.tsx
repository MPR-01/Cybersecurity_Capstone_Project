import { AdvisoryType, Severity } from '../../types';

interface ArticleFiltersProps {
  selectedType: AdvisoryType | 'all';
  selectedSeverity: Severity | 'all';
  sortBy: 'date' | 'severity';
  onTypeChange: (type: AdvisoryType | 'all') => void;
  onSeverityChange: (severity: Severity | 'all') => void;
  onSortChange: (sort: 'date' | 'severity') => void;
}

export function ArticleFilters({
  selectedType,
  selectedSeverity,
  sortBy,
  onTypeChange,
  onSeverityChange,
  onSortChange,
}: ArticleFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            id="type-filter"
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as AdvisoryType | 'all')}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All Types</option>
            <option value="government_advisory">Government Advisory</option>
            <option value="awareness">Awareness</option>
            <option value="incident">Incident Report</option>
          </select>
        </div>

        <div>
          <label htmlFor="severity-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Severity
          </label>
          <select
            id="severity-filter"
            value={selectedSeverity}
            onChange={(e) => onSeverityChange(e.target.value as Severity | 'all')}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'date' | 'severity')}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="date">Latest First</option>
            <option value="severity">Severity</option>
          </select>
        </div>
      </div>
    </div>
  );
}
