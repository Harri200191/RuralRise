import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-emerald-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About RuralRise</h3>
            <p className="text-emerald-100">
              Empowering rural women entrepreneurs through technology, education, and community.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-emerald-100 hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-emerald-100 hover:text-white">Contact</a></li> 
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-emerald-100 hover:text-white">Blog</a></li>
              <li><a href="/tutorials" className="text-emerald-100 hover:text-white">Tutorials</a></li>
              <li><a href="/success-stories" className="text-emerald-100 hover:text-white">Success Stories</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Languages</h3>
            <ul className="space-y-2">
              <li><button className="text-emerald-100 hover:text-white">English</button></li>
              <li><button className="text-emerald-100 hover:text-white">اردو</button></li>
              <li><button className="text-emerald-100 hover:text-white">پنجابی</button></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-emerald-700 text-center">
          <p className="flex items-center justify-center text-emerald-100">
            Made with <Heart size={16} className="mx-1 text-red-400" /> for rural entrepreneurs
          </p>
        </div>
      </div>
    </footer>
  );
}