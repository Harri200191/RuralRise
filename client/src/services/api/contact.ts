import api from './base';

export const contact = {
  sendMessage: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const response = await api.post('/contact/send', data);
    return response.data;
  }
};