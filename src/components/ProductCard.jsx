import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import { formatCurrency } from "../utils/format";
import { ShoppingCart, Check, Eye, ImageIcon } from 'lucide-react'; 

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);
  const inCart = !!cartItems[product.id];

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-4 transition duration-300 transform hover:-translate-y-1 hover:border-sky-500 flex flex-col h-full"
    >
      
      <Link 
        to={`/product/${product.id}`} 
        className="flex bg-slate-700 rounded-lg justify-center items-center py-4 h-56 w-full"
      >
        <div 
          className="rounded-lg p-2 flex items-center justify-center h-full w-full overflow-hidden 
                     hover:scale-105 transition-transform duration-500 relative"
        >
          {/* while image loading it will display this */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-700 rounded-lg animate-pulse">
              <ImageIcon className="w-10 h-10 text-gray-500" />
            </div>
          )}

          <img 
            src={product.image} 
            alt={product.title} 
            className={`max-h-full max-w-full object-contain ${imageLoaded ? 'block' : 'hidden'}`} 
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)} 
          />
        </div>
      </Link>

      <div className="mt-4 flex flex-col flex-grow">
        
        {/* Title */}
        <Link 
          to={`/product/${product.id}`} 
          className="block text-base font-semibold text-white hover:text-sky-400 transition mb-2 flex-grow"
        >
          {product.title.length > 70 ? product.title.slice(0, 70) + "…" : product.title}
        </Link>

        {/* Category and Price */}
        <div className="mt-2 flex items-center justify-between pb-3 border-b border-slate-700">
          <span className="text-xs uppercase font-medium text-gray-400 tracking-wider">
            {product.category}
          </span>
          <span className="text-xl font-extrabold text-sky-500">
            {formatCurrency(product.price)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3">
          {inCart ? (
            <button
              onClick={() => dispatch(removeFromCart(product.id))}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg 
                         bg-red-600 text-white font-medium hover:bg-red-500 transition 
                         shadow-md shadow-red-600/30"
            >
              <Check className="w-4 h-4" />
              In Cart
            </button>
          ) : (
            <button
              onClick={() => dispatch(addToCart(product))}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg 
                         bg-sky-600 text-white font-medium hover:bg-sky-500 transition 
                         shadow-md shadow-sky-600/30"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          )}

          <Link
            to={`/product/${product.id}`}
            className="px-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-gray-300 text-sm 
                       flex items-center justify-center hover:bg-slate-600 transition"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}