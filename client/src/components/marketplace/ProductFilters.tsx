import React from 'react';
import { Filter, ArrowUpDown, RotateCcw } from 'lucide-react';

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  sortBy: string;
  onSortChange: (sort: 'price-asc' | 'price-desc' | 'newest' | 'oldest') => void;
  onReset: () => void;
}

const CATEGORIES = ['All', 'Handicrafts', 'Food', 'Textiles', 'Art'];

const SORT_OPTIONS = [ 
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const DEFAULT_PRICE_RANGE = { min: 0, max: 1000000 };

export function ProductFilters({ 
  selectedCategory, 
  onCategoryChange, 
  onPriceRangeChange,
  sortBy,
  onSortChange,
  onReset
}: ProductFiltersProps) {
  const [priceRange, setPriceRange] = React.useState(DEFAULT_PRICE_RANGE);
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value) || 0;
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handleReset = () => {
    setPriceRange(DEFAULT_PRICE_RANGE);
    onReset();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        <Filter size={20} className="mr-2" />
        Filters & Sort
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filters & Sort</h3>
            <button
              onClick={handleReset}
              className="flex items-center text-sm text-emerald-600 hover:text-emerald-700"
            >
              <RotateCcw size={14} className="mr-1" />
              Reset All
            </button>
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 flex items-center">
              <ArrowUpDown size={16} className="mr-2" />
              Sort By
            </h3>
            <div className="space-y-2">
              {SORT_OPTIONS.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => onSortChange(e.target.value as any)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Category</h3>
            <div className="space-y-2">
              {CATEGORIES.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm">Min Price:</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange(e, 'min')}
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-sm">Max Price:</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange(e, 'max')}
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}