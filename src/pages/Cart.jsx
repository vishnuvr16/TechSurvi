import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeQuantity, removeFromCart, clearCart } from "../redux/slices/cartSlice";
import { formatCurrency } from "../utils/format";
import { ShoppingCart, Trash2, X, Plus, Minus, ArrowRight } from 'lucide-react'; 

export default function Cart() {
  const cartItems = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();

  const items = Object.values(cartItems);
  const total = items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);

  if (!items.length) {
    return (
      <div className="min-h-screen bg-slate-900 text-gray-100"> 
        <div className="container mx-auto px-6 py-12 flex justify-center items-center">
          <div className="bg-slate-800 p-12 rounded-xl shadow-2xl text-center border border-slate-700 max-w-lg">
            <ShoppingCart className="w-16 h-16 text-sky-500 mx-auto mb-6" />
            <h2 className="text-3xl font-extrabold text-white">Your Cart is Empty</h2>
            <p className="mt-4 text-gray-400">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link 
              to="/"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white font-medium rounded-lg 
                         hover:bg-sky-500 transition shadow-lg shadow-sky-600/40"
            >
              Start Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100"> 
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-4xl font-extrabold text-white mb-8 border-b border-sky-600/50 pb-4">
          Your <span className="text-sky-500">Cart</span>
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8">

          {/* left sdie  */}
          <div className="lg:w-3/4 space-y-6">
            {items.map(({ product, quantity }) => (
              <div 
                key={product.id} 
                className="flex items-center bg-slate-800 rounded-xl p-4 md:p-6 shadow-lg border border-slate-700 transition"
              >
                
                <Link to={`/product/${product.id}`} className="flex-shrink-0 mr-4">
                  <div className="w-20 h-20 bg-slate-700 rounded-lg flex items-center justify-center p-2">
                    <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain" />
                  </div>
                </Link>
                
                {/* Product Info */}
                <div className="flex-1 min-w-0 mr-4">
                  <Link 
                    to={`/product/${product.id}`} 
                    className="font-semibold text-white hover:text-sky-400 truncate block"
                  >
                    {product.title}
                  </Link>
                  <div className="text-sm text-gray-500 mt-1">{product.category}</div>
                  <div className="text-sm font-medium text-sky-400 mt-1">
                    {formatCurrency(product.price)} / item
                  </div>
                </div>

                <div className="flex items-center gap-3 w-32 justify-end flex-shrink-0">
                  <button 
                    onClick={() => dispatch(changeQuantity({ id: product.id, quantity: quantity - 1 }))}
                    disabled={quantity <= 1}
                    className="p-1 bg-slate-700 rounded-full text-gray-300 hover:bg-slate-600 disabled:opacity-30 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    className="w-10 bg-slate-700 text-white text-center rounded-md border border-slate-600 py-1 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    min="1"
                    value={quantity}
                    onChange={(e) => dispatch(changeQuantity({ id: product.id, quantity: Number(e.target.value) }))}
                  />
                  <button 
                    onClick={() => dispatch(changeQuantity({ id: product.id, quantity: quantity + 1 }))}
                    className="p-1 bg-slate-700 rounded-full text-gray-300 hover:bg-slate-600 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-32 text-right flex flex-col items-end flex-shrink-0 ml-4">
                  <div className="text-lg font-bold text-white mb-2">
                    {formatCurrency(product.price * quantity)}
                  </div>
                  <button 
                    onClick={() => dispatch(removeFromCart(product.id))} 
                    className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1 transition"
                  >
                    <X className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* right side */}
          <div className="lg:w-1/4 bg-slate-800 rounded-xl p-6 shadow-2xl border border-slate-700 h-fit">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-3">Order Summary</h3>
            
            <div className="flex justify-between items-center text-gray-400 mb-2">
              <span>Items Subtotal:</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 mb-4 border-b border-slate-700 pb-4">
              <span>Shipping:</span>
              <span className="text-sky-400 font-medium">Free</span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-lg text-white">Total</div>
              <div className="text-3xl font-extrabold text-sky-500">{formatCurrency(total)}</div>
            </div>
            
            <button 
              className="w-full mt-6 px-4 py-3 rounded-lg bg-green-600 text-white font-semibold 
                         text-lg hover:bg-green-500 transition shadow-lg shadow-green-600/40 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
            </button>
            
            <button 
              onClick={() => dispatch(clearCart())} 
              className="w-full mt-3 px-4 py-2 border border-red-700 rounded-lg text-red-500 
                         hover:bg-red-900/50 transition flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}