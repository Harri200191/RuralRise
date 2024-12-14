import React from 'react';
import { BookOpen, Video, FileText } from 'lucide-react';
import { FilterSection } from '../components/learn/FilterSection';
import { useFilters } from '../hooks/useFilters';
import type { Resource } from '../types';

const LANGUAGE_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'urdu', label: 'اردو' },
  { value: 'punjabi', label: 'پنجابی' }
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
    // English Beginner Resources
    {
      id: '1',
      title: 'Introduction to Digital Marketing',
      type: 'video',
      language: 'english',
      difficulty: 'beginner',
      url: '#',
      description: 'Learn the basics of digital marketing to grow your online presence.'
    },
    {
      id: '2',
      title: 'Starting a Dropshipping Business',
      type: 'article',
      language: 'english',
      difficulty: 'beginner',
      url: '#',
      description: 'Understand the essentials of launching a successful dropshipping store.'
    },
    {
      id: '3',
      title: 'Freelancing for Beginners',
      type: 'course',
      language: 'english',
      difficulty: 'beginner',
      url: '#',
      description: 'Step-by-step guide to becoming a successful freelancer in the digital economy.'
    },
  
    // Urdu Intermediate Resources
    {
      id: '4',
      title: 'SEO Techniques for Small Businesses',
      type: 'video',
      language: 'urdu',
      difficulty: 'intermediate',
      url: '#',
      description: 'Learn search engine optimization techniques to increase website traffic.'
    },
    {
      id: '5',
      title: 'Social Media Strategies',
      type: 'article',
      language: 'urdu',
      difficulty: 'intermediate',
      url: '#',
      description: 'Effective strategies to boost your business through social media platforms.'
    },
    {
      id: '6',
      title: 'Content Marketing Mastery',
      type: 'course',
      language: 'urdu',
      difficulty: 'intermediate',
      url: '#',
      description: 'Master content marketing and learn how to create engaging content.'
    },
  
    // Punjabi Advanced Resources
    {
      id: '7',
      title: 'Scaling Your Online Business',
      type: 'video',
      language: 'punjabi',
      difficulty: 'advanced',
      url: '#',
      description: 'Techniques and strategies for scaling your business to the next level.'
    },
    {
      id: '8',
      title: 'E-commerce Analytics',
      type: 'article',
      language: 'punjabi',
      difficulty: 'advanced',
      url: '#',
      description: 'Learn how to analyze data to improve your e-commerce performance.'
    },
    {
      id: '9',
      title: 'Advanced Marketing Funnels',
      type: 'course',
      language: 'punjabi',
      difficulty: 'advanced',
      url: '#',
      description: 'Deep dive into creating and optimizing advanced marketing funnels.'
    },
  
    // Sindhi Beginner Resources
    {
      id: '10',
      title: 'Basics of Graphic Design',
      type: 'video',
      language: 'sindhi',
      difficulty: 'beginner',
      url: '#',
      description: 'Learn the fundamentals of graphic design using popular tools.'
    },
    {
      id: '11',
      title: 'Starting a Blog',
      type: 'article',
      language: 'sindhi',
      difficulty: 'beginner',
      url: '#',
      description: 'A beginner-friendly guide to launching and monetizing a blog.'
    },
    {
      id: '12',
      title: 'Introduction to Affiliate Marketing',
      type: 'course',
      language: 'sindhi',
      difficulty: 'beginner',
      url: '#',
      description: 'Learn how to start earning through affiliate marketing programs.'
    },
  
    // English Advanced Resources
    {
      id: '13',
      title: 'Artificial Intelligence in E-commerce',
      type: 'video',
      language: 'english',
      difficulty: 'advanced',
      url: '#',
      description: 'Discover how AI is revolutionizing the e-commerce landscape.'
    },
    {
      id: '14',
      title: 'International Market Expansion',
      type: 'article',
      language: 'english',
      difficulty: 'advanced',
      url: '#',
      description: 'Guide to taking your business to global markets effectively.'
    },
    {
      id: '15',
      title: 'Data-Driven Marketing',
      type: 'course',
      language: 'english',
      difficulty: 'advanced',
      url: '#',
      description: 'Learn advanced data-driven marketing techniques for scaling your business.'
    }
  
    // Add more resources as needed to expand the dataset.
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