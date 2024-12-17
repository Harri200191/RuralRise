import { ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onDelete?: (productId: string) => void;
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  const [isDeleting, setIsDeleting] = useState(false); // Track loading state
  const addToCart = useCartStore(state => state.addItem);
  const { user } = useAuthStore();
  const isOwner = user?.name === product.seller;

  const handleDelete = async (productId: string) => {
    setIsDeleting(true); // Start loading state
    try {
      if (onDelete) {
        await onDelete(productId); // Call the onDelete handler passed as prop
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsDeleting(false); // End loading state
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={product.image.filePath}
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
          <div className="flex gap-2">
            {isOwner && onDelete && (
              <button
                onClick={() => handleDelete(product._id)}
                className={`flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 ${isDeleting ? 'bg-red-400 cursor-not-allowed' : ''}`}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="animate-spin">...</span> // You can replace this with a spinner component
                ) : (
                  <Trash2 size={16} />
                )}
              </button>
            )}
            <button
              onClick={() => addToCart(product)}
              className="flex items-center space-x-1 bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
            >
              <ShoppingCart size={16} />
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
