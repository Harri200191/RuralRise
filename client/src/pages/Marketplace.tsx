import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { Product } from '../types';

export function Marketplace() {
  const [products] = React.useState<Product[]>([
    {
      id: '1',
      title: 'Hand-woven Shawl',
      description: 'Traditional hand-woven shawl made with local wool',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1601244005535-a48d21d951ac?auto=format&fit=crop&q=80&w=500',
      seller: 'Fatima Crafts',
      category: 'Textiles'
    },
    {
      id: '2',
      title: 'Organic Honey',
      description: 'Pure organic honey from the mountains',
      price: 800,
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=500',
      seller: 'Mountain Bee Farm',
      category: 'Food'
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Marketplace</h1>
        
        <div className="flex w-full md:w-auto space-x-4">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          
          <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter size={20} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-emerald-600 font-semibold">Rs. {product.price}</span>
                <span className="text-sm text-gray-500">{product.seller}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}