import React from 'react';
import { ArrowRight, Star, Users, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative bg-emerald-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering Rural Women Entrepreneurs
            </h1>
            <p className="text-xl mb-8">
              Connect, learn, and grow your business with our supportive community and resources.
            </p>
            <Link
              to="/marketplace"
              className="inline-flex items-center bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How We Help You Succeed</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-emerald-50">
            <ShoppingBag className="mx-auto mb-4 text-emerald-600" size={32} />
            <h3 className="text-xl font-semibold mb-3">Online Marketplace</h3>
            <p className="text-gray-600">
              Sell your products to customers across Pakistan through our easy-to-use platform
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-emerald-50">
            <Star className="mx-auto mb-4 text-emerald-600" size={32} />
            <h3 className="text-xl font-semibold mb-3">Skill Development</h3>
            <p className="text-gray-600">
              Access training resources and workshops to enhance your business skills
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-emerald-50">
            <Users className="mx-auto mb-4 text-emerald-600" size={32} />
            <h3 className="text-xl font-semibold mb-3">Mentorship</h3>
            <p className="text-gray-600">
              Connect with experienced mentors who can guide you on your entrepreneurial journey
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=500"
                alt="Success story"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Fatima's Handicraft Business</h3>
              <p className="text-gray-600">
                "Through RuralRise, I was able to expand my handicraft business beyond my village and reach customers in cities."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=500"
                alt="Success story"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Ayesha's Food Enterprise</h3>
              <p className="text-gray-600">
                "The mentorship program helped me improve my business management skills and grow my home-based food business."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}