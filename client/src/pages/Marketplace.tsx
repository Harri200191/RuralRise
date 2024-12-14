import React, { useState } from 'react';
import { Filter, ShoppingCart } from 'lucide-react';
import { ProductCard } from '../components/marketplace/ProductCard';
import { ProductSearch } from '../components/marketplace/ProductSearch';
import { AddProductForm } from '../components/marketplace/AddProductForm';
import { CartDrawer } from '../components/marketplace/CartDrawer';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useProducts } from '../hooks/useProducts';

export function Marketplace() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthStore();
  const cartItems = useCartStore(state => state.items);
  const { productList, isLoading, error, addProduct } = useProducts();

  const filteredProducts = productList.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProductSuccess = () => {
    setShowAddProduct(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Marketplace</h1>
        
        <div className="flex w-full md:w-auto space-x-4 items-center">
          <ProductSearch onSearch={setSearchQuery} />
          
          <button 
            onClick={() => setShowCart(true)}
            className="relative flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <ShoppingCart size={20} className="mr-2" />
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
          
          <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter size={20} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      {user?.role === 'entrepreneur' && (
        <div className="mb-8">
          <button
            onClick={() => setShowAddProduct(!showAddProduct)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            {showAddProduct ? 'Cancel' : 'Add New Product'}
          </button>

          {showAddProduct && (
            <div className="mt-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
              <AddProductForm onSuccess={handleAddProductSuccess} />
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
    </div>
  );
}