import React from 'react';
import type { BlogPostType } from '../../types';

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="text-sm text-emerald-600">{post.category}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm text-gray-500">{post.author.role}</p>
          </div>
        </div>
      </div>
    </article>
  );
}