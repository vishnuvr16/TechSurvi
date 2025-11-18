import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart, Package } from 'lucide-react';

export default function Navbar() {
  const cartItems = useSelector((s) => s.cart.items);

  const totalCount = Object.values(cartItems).reduce((sum, it) => sum + it.quantity, 0);

  return (
    <nav className="bg-slate-900 shadow-xl border-b border-sky-500/50">
      <div className="container mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
        
        <Link 
          to="/" 
          className="text-2xl font-extrabold text-white tracking-wider hover:text-sky-400 transition duration-300 flex items-center gap-2"
        >
          <Package className="w-6 h-6 text-sky-500" />
          TechSurvi <span className="text-sky-500">Store</span>
        </Link>
        
        <div className="flex items-center gap-6">
          
          <Link 
            to="/" 
            className="text-base font-medium text-gray-300 hover:text-sky-400 transition duration-300 relative group"
          >
            Products
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          
          <Link 
            to="/cart" 
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg px-4 py-2 transition duration-300 shadow-lg shadow-sky-600/40 relative"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            
            {/* badge */}
            <span 
              className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-rose-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center ring-2 ring-slate-900"
            >
              {totalCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}