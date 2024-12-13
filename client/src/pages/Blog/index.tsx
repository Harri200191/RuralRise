import React from 'react';
import { BlogPost } from './BlogPost';
import type { BlogPostType } from '../../types';

export function Blog() {
  const posts: BlogPostType[] = [
    {
      id: '1',
      title: 'Starting Your Online Business: A Guide for Rural Entrepreneurs',
      excerpt: 'Learn the essential steps to launch your online business and reach customers beyond your local market.',
      content: '',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=500',
      category: 'Business',
      date: 'March 15, 2024',
      author: {
        name: 'Amina Khan',
        role: 'Business Mentor',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
      }
    },
    {
      id: '2',
      title: 'Digital Marketing Strategies for Rural Businesses',
      excerpt: 'Discover effective digital marketing techniques to promote your products and services online.',
      content: '',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500',
      category: 'Marketing',
      date: 'March 12, 2024',
      author: {
        name: 'Sarah Ahmed',
        role: 'Digital Marketing Expert',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
      }
    },
    {
      id: '3',
      title: 'Financial Management Tips for Small Businesses',
      excerpt: 'Essential financial management practices to help your rural business grow and succeed.',
      content: '',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500',
      category: 'Finance',
      date: 'March 10, 2024',
      author: {
        name: 'Zainab Ali',
        role: 'Financial Advisor',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
      }
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">RuralRise Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and success stories to help rural women entrepreneurs thrive in business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}