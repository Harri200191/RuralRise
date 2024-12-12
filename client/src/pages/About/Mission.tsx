import React from 'react';
import { Target, Users, Globe } from 'lucide-react';

export function Mission() {
  return (
    <section className="py-12 bg-emerald-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Target className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Empower Women</h3>
            <p className="text-gray-600">
              Provide rural women entrepreneurs with the tools and resources they need to succeed in business
            </p>
          </div>
          <div className="text-center">
            <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Build Community</h3>
            <p className="text-gray-600">
              Create a supportive network of mentors and fellow entrepreneurs
            </p>
          </div>
          <div className="text-center">
            <Globe className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Bridge Gaps</h3>
            <p className="text-gray-600">
              Connect rural businesses with broader markets and opportunities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}