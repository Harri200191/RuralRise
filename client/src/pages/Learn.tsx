import React from 'react';
import { BookOpen, Video, FileText } from 'lucide-react';
import type { Resource } from '../types';

export function Learn() {
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
      <h1 className="text-3xl font-bold mb-8">Learning Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-6 bg-emerald-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Filter by Language</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-emerald-600" />
              <span className="ml-2">English</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-emerald-600" />
              <span className="ml-2">اردو</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-emerald-600" />
              <span className="ml-2">پنجابی</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-emerald-600" />
              <span className="ml-2">سنڌي</span>
            </label>
          </div>
        </div>

        <div className="p-6 bg-emerald-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Filter by Type</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-emerald-600" />
              <span className="ml-2">Videos</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-emerald-600" />
              <span className="ml-2">Articles</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-emerald-600" />
              <span className="ml-2">Courses</span>
            </label>
          </div>
        </div>

        <div className="p-6 bg-emerald-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Filter by Level</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-emerald-600" />
              <span className="ml-2">Beginner</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-emerald-600" />
              <span className="ml-2">Intermediate</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-emerald-600" />
              <span className="ml-2">Advanced</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
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
    </div>
  );
}