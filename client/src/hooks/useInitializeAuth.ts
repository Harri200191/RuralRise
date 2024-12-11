import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { auth } from '../services/api';

export function useInitializeAuth() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getCurrentUser()
        .then(({ user }) => setUser(user))
        .catch(() => localStorage.removeItem('token'));
    }
  }, [setUser]);
}