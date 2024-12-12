import React from 'react';
import { StoryCard } from './StoryCard';
import type { SuccessStoryType } from '../../types';

export function SuccessStories() {
  const stories: SuccessStoryType[] = [
    {
      id: '1',
      title: 'From Local Artisan to Online Success',
      excerpt: 'How Fatima transformed her traditional handicraft business into a thriving online enterprise.',
      content: '',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=500',
      entrepreneur: {
        name: 'Fatima Bibi',
        business: 'Fatima Handicrafts',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
      },
      tags: ['Handicrafts', 'E-commerce', 'Rural Business']
    },
    {
      id: '2',
      title: 'Growing a Food Business Through Digital Marketing',
      excerpt: 'Ayesha journey of expanding her home-based food business using social media and online platforms.',
      content: '',
      image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=500',
      entrepreneur: {
        name: 'Ayesha Khan',
        business: 'Ayesha Kitchen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
      },
      tags: ['Food Business', 'Digital Marketing', 'Home-based']
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Success Stories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Inspiring stories of rural women entrepreneurs who have transformed their businesses through RuralRise
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
}