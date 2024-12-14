import React from 'react';
import { Users } from 'lucide-react';
import type { User } from '../types';

export function Community() {
  const [mentors] = React.useState<User[]>([
    {
      id: '1',
      name: 'Amina Khan',
      role: 'mentor',
      location: 'Lahore',
      skills: ['Business Strategy', 'Marketing', 'Finance'],
      bio: 'Experienced entrepreneur helping women build successful businesses',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: '2',
      name: 'Sarah Ahmed',
      role: 'mentor',
      location: 'Karachi',
      skills: ['E-commerce', 'Digital Marketing', 'Product Development'],
      bio: 'Digital marketing expert with 10+ years of experience',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Community Hub</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with mentors and fellow entrepreneurs to share experiences, get advice, and grow together.
        </p>
      </div>
 

        <div className="bg-emerald-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Users className="text-emerald-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Featured Mentors</h2>
          </div>
          <div className="space-y-4">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-white p-4 rounded-lg flex items-start">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{mentor.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{mentor.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> 

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Connect?</h2>
        <p className="text-gray-600 mb-6">
          Join our community to connect with mentors and fellow entrepreneurs
        </p>
        <a
          href="https://discord.gg/MGPX2647" // Replace with your desired URL
          target="_blank" // Opens the link in a new tab
          rel="noopener noreferrer" // Improves security when using target="_blank"
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
          Join the Community
        </a>
      </div>
    </div>
  );
}