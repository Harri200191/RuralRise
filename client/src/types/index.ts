export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  seller: string;
  category: string;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
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

export interface TeamMemberType {
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface BlogPostType {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface TutorialType {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  lessons: number;
}

export interface SuccessStoryType {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  entrepreneur: {
    name: string;
    business: string;
    avatar: string;
  };
  tags: string[];
}