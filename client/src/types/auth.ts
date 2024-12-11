export interface User {
  id: string;
  name: string;
  email: string;
  role: 'entrepreneur' | 'mentor' | 'admin';
  location?: string;
  skills?: string[];
  bio?: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: 'entrepreneur' | 'mentor';
  location?: string;
}