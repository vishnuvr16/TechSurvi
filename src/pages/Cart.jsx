import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeQuantity, removeFromCart, clearCart } from "../redux/slices/cartSlice";
import { formatCurrency } from "../utils/format";

export default function Cart() {
  const cartItems = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();

  const items = Object.values(cartItems);
  const total = items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);

  if (!items.length) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Add some products to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center gap-4 border-b pb-4">
              <img src={product.image} alt={product.title} className="w-20 h-20 object-contain" />
              <div className="flex-1">
                <div className="font-medium">{product.title}</div>
                <div className="text-sm text-gray-500">{product.category}</div>
              </div>
              <div className="w-40 flex items-center gap-2">
                <input
                  type="number"
                  className="w-20 border rounded px-2 py-1"
                  min="1"
                  value={quantity}
                  onChange={(e) => dispatch(changeQuantity({ id: product.id, quantity: Number(e.target.value) }))}
                />
                <div className="font-semibold">{formatCurrency(product.price * quantity)}</div>
              </div>
              <div>
                <button onClick={() => dispatch(removeFromCart(product.id))} className="text-red-500">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            <button onClick={() => dispatch(clearCart())} className="px-3 py-2 border rounded">Clear Cart</button>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-2xl font-bold">{formatCurrency(total)}</div>
            <button className="mt-3 px-4 py-2 rounded bg-green-600 text-white">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
