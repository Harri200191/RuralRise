import api from './base';
import type { Product } from '../../types/index';

export const products = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  create: async (productData: Partial<Product>): Promise<Product> => {
    const response = await api.post('/products', productData);
    return response.data;
  },
};