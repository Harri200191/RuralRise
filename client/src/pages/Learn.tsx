import React from 'react';
import { BookOpen, Video, FileText } from 'lucide-react';
import { FilterSection } from '../components/learn/FilterSection';
import { useFilters } from '../hooks/useFilters';
import type { Resource } from '../types';

const LANGUAGE_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'urdu', label: 'اردو' },
  { value: 'punjabi', label: 'پنجابی' },
  { value: 'sindhi', label: 'سنڌي' }
];

const TYPE_OPTIONS = [
  { value: 'video', label: 'Videos' },
  { value: 'article', label: 'Articles' },
  { value: 'course', label: 'Courses' }
];

const LEVEL_OPTIONS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

export function Learn() {
  const { filters, toggleFilter, clearFilters } = useFilters();
  const [resources] = React.useState<Resource[]>([
    {
      id: '1',
      title: 'Getting Started with Online Business',
      type: 'video',
      language: 'urdu',
      difficulty: 'beginner',
      url: '#',
      description: 'Learn the basics of setting up and running an online business'
    },
    {
      id: '2',
      title: 'Financial Management for Small Businesses',
      type: 'course',
      language: 'english',
      difficulty: 'intermediate',
      url: '#',
      description: 'Master the essentials of managing your business finances'
    }
  ]);

  const filteredResources = resources.filter(resource => {
    const languageMatch = filters.languages.length === 0 || filters.languages.includes(resource.language);
    const typeMatch = filters.types.length === 0 || filters.types.includes(resource.type);
    const levelMatch = filters.levels.length === 0 || filters.levels.includes(resource.difficulty);
    return languageMatch && typeMatch && levelMatch;
  });

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return <Video className="text-emerald-600" size={24} />;
      case 'article':
        return <FileText className="text-emerald-600" size={24} />;
      case 'course':
        return <BookOpen className="text-emerald-600" size={24} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Learning Resources</h1>
        {(filters.languages.length > 0 || filters.types.length > 0 || filters.levels.length > 0) && (
          <button
            onClick={clearFilters}
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            Clear all filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FilterSection
          title="Filter by Language"
          options={LANGUAGE_OPTIONS}
          selectedValues={filters.languages}
          onChange={(value) => toggleFilter('languages', value)}
        />

        <FilterSection
          title="Filter by Type"
          options={TYPE_OPTIONS}
          selectedValues={filters.types}
          onChange={(value) => toggleFilter('types', value)}
        />

        <FilterSection
          title="Filter by Level"
          options={LEVEL_OPTIONS}
          selectedValues={filters.levels}
          onChange={(value) => toggleFilter('levels', value)}
        />
      </div>

      {filteredResources.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No resources match your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {getIcon(resource.type)}
                <span className="ml-2 text-sm text-gray-500 capitalize">{resource.type}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                  {resource.language}
                </span>
                <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  {resource.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}