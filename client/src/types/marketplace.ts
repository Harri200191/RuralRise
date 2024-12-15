export interface ProductFormData {
    title: string;
    description: string;
    price: number;
    category: string;
    imageUrl: object;
  } 
  
  export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: object;
    seller: string;
    category: string;
    createdAt?: string;
    updatedAt?: string;
  }