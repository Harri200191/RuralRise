import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore(state => state.addItem);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-emerald-600 font-semibold">Rs. {product.price}</span>
          <span className="text-sm text-gray-500">{product.seller}</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
            {product.category}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center space-x-1 bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}