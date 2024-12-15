import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { products } from '../../services/api';
import type { ProductFormData } from '../../types/marketplace';

interface AddProductFormProps {
  onSuccess?: (newProduct: ProductFormData) => void; // Type it according to the product data returned by API
}

export function AddProductForm({ onSuccess }: AddProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // Store selected file
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    setError(null);
  
    try {
      // Create a FormData object
      const formData = new FormData();
  
      // Append the regular product data to FormData
      Object.keys(data).forEach((key) => {
        const value = data[key as keyof ProductFormData];
  
        if (value !== undefined && value !== null) {
          // Append key-value pair to FormData
          formData.append(key, value.toString());
        }
      }); 

      if (imageFile) {
        formData.append('file', imageFile);  
      } 
 
      const newProduct = await products.create(formData);  
  
      reset();
      onSuccess?.(newProduct); // Pass the new product to the parent
    } catch (err) {
      setError('Failed to add product. Please try again.');
      console.error('Add product error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Product Title
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          {...register('description', { required: 'Description is required' })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price (PKR)
        </label>
        <input
          type="number"
          id="price"
          {...register('price', { 
            required: 'Price is required',
            min: { value: 0, message: 'Price must be positive' }
          })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          {...register('category', { required: 'Category is required' })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        >
          <option value="">Select a category</option>
          <option value="Handicrafts">Handicrafts</option>
          <option value="Food">Food</option>
          <option value="Textiles">Textiles</option>
          <option value="Art">Art</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          Upload Product Image
        </label>
        <input
          type="file"
          id="imageUrl"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
        {imageFile && (
          <p className="mt-2 text-sm text-gray-500">Selected file: {imageFile.name}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Adding Product...' : 'Add Product'}
      </button>
    </form>
  );
}
