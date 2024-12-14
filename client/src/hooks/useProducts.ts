import { useState, useEffect } from 'react';
import { products } from '../services/api';
import type { Product } from '../types';

export function useProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
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

    fetchProducts();
  }, []);

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

  return { productList, isLoading, error, addProduct };
}