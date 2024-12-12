import React from 'react';
import { Clock, BookOpen } from 'lucide-react';
import type { TutorialType } from '../../types';

interface TutorialCardProps {
  tutorial: TutorialType;
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={tutorial.image}
        alt={tutorial.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full">
            {tutorial.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
        <p className="text-gray-600 mb-4">{tutorial.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={16} className="mr-1" />
          <span className="mr-4">{tutorial.duration}</span>
          <BookOpen size={16} className="mr-1" />
          <span>{tutorial.lessons} lessons</span>
        </div>
      </div>
    </div>
  );
}