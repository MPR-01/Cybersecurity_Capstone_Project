import { useState, useMemo } from 'react';
import { useRegion } from '../../context/RegionContext';
import { getAdvisories } from '../../services/dataLoader';
import { AdvisoryType, Severity } from '../../types';
import { ArticleCard } from './ArticleCard';
import { ArticleFilters } from './ArticleFilters';
import { RefreshCw } from 'lucide-react';

export function ArticlesList() {
  const { region } = useRegion();
  const [selectedType, setSelectedType] = useState<AdvisoryType | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'severity'>('date');

  const filteredAdvisories = useMemo(() => {
    let advisories = getAdvisories(region);

    if (selectedType !== 'all') {
      advisories = advisories.filter(a => a.type === selectedType);
    }

    if (selectedSeverity !== 'all') {
      advisories = advisories.filter(a => a.severity === selectedSeverity);
    }

    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };

    if (sortBy === 'date') {
      advisories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      advisories.sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);
    }

    return advisories;
  }, [region, selectedType, selectedSeverity, sortBy]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Advisories & Articles</h2>
          <p className="mt-1 text-sm text-gray-600">
            {filteredAdvisories.length} advisories found
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

      <ArticleFilters
        selectedType={selectedType}
        selectedSeverity={selectedSeverity}
        sortBy={sortBy}
        onTypeChange={setSelectedType}
        onSeverityChange={setSelectedSeverity}
        onSortChange={setSortBy}
      />

      <div className="grid grid-cols-1 gap-6">
        {filteredAdvisories.map(advisory => (
          <ArticleCard key={advisory.id} advisory={advisory} />
        ))}
        {filteredAdvisories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No advisories match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
