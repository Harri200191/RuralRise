import api from './base';
import type { Resource } from '../../types/index';

export const resources = {
  getAll: async (): Promise<Resource[]> => {
    const response = await api.get('/resources');
    return response.data;
  },
};