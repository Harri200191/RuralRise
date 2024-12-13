import React from 'react';
import { Search } from 'lucide-react';

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

export function ProductSearch({ onSearch }: ProductSearchProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
    </div>
  );
}