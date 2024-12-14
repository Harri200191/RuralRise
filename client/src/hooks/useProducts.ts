import { useState, useEffect } from 'react';
import { products } from '../services/api';
import type { Product } from '../types';

export function useProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productList, setProductList] = useState<Product[]>([
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