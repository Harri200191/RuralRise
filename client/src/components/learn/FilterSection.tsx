import React from 'react';

interface FilterSectionProps {
  title: string;
  options: Array<{ value: string; label: string }>;
  selectedValues: string[];
  onChange: (value: string) => void;
}

export function FilterSection({ title, options, selectedValues, onChange }: FilterSectionProps) {
  return (
    <div className="p-6 bg-emerald-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {options.map(({ value, label }) => (
          <label key={value} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedValues.includes(value)}
              onChange={() => onChange(value)}
              className="form-checkbox text-emerald-600"
            />
            <span className="ml-2">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}