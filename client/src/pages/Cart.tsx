// src/pages/Cart.tsx
import { useCartStore } from '../store/cartStore';

export const Cart = () => {
  const { items, addItem, removeItem, clearCart } = useCartStore();

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};
