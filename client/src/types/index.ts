export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  seller: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  role: 'entrepreneur' | 'mentor' | 'admin';
  location: string;
  skills: string[];
  bio?: string;
  avatar?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'course';
  language: 'urdu' | 'english' | 'sindhi' | 'punjabi';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  url: string;
  description: string;
}