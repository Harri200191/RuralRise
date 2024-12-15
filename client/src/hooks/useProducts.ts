import { useState, useEffect } from 'react';
import { products } from '../services/api';
import type { Product } from '../types';

interface FilterOptions {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  searchQuery?: string;
}

export function useProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await products.getAll();
      setProductList(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (productData: any) => {
    try {
      setIsLoading(true);
      const newProduct = await products.create(productData);
      setProductList(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError('Failed to add product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await products.delete(productId);
      setProductList(prev => prev.filter(p => p.id !== productId));
    } catch (err) {
      setError('Failed to delete product');
      throw err;
    }
  };

  const filterProducts = (products: Product[], filters: FilterOptions) => {
    return products.filter(product => {
      const categoryMatch = !filters.category || filters.category === 'All' || 
        product.category === filters.category;
      
      const priceMatch = !filters.priceRange || 
        (product.price >= filters.priceRange.min && 
         product.price <= filters.priceRange.max);
      
      const searchMatch = !filters.searchQuery || 
        product.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    });
  };

  return { 
    productList, 
    isLoading, 
    error, 
    addProduct, 
    deleteProduct,
    filterProducts,
    setProductList
  };
}