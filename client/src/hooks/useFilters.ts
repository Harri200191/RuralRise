import { useState, useCallback } from 'react';

interface Filters {
  languages: string[];
  types: string[];
  levels: string[];
}

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({
    languages: [],
    types: [],
    levels: []
  });

  const toggleFilter = useCallback((category: keyof Filters, value: string) => {
    setFilters(prev => {
      const currentFilters = prev[category];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(item => item !== value)
        : [...currentFilters, value];
      
      return {
        ...prev,
        [category]: newFilters
      };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      languages: [],
      types: [],
      levels: []
    });
  }, []);

  return { filters, toggleFilter, clearFilters };
}