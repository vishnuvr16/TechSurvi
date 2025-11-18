import React from "react";
import { Link } from "react-router-dom";
import { Package, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 border-t border-sky-500/50 py-8 md:py-12">
      <div className="container mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-slate-700 pb-8 mb-8">
          
          <div className="col-span-2 lg:col-span-2">
            <Link 
              to="/" 
              className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-2 mb-4"
            >
              <Package className="w-6 h-6 text-sky-500" />
              TechSurvi <span className="text-sky-500">Store</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Your source for the latest electronics and gear. Developed with passion by **Vishnu**.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-sky-400 transition">Products</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-sky-400 transition">View Cart</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-sky-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-sky-400 transition">Contact</Link></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/faq" className="text-gray-400 hover:text-sky-400 transition">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-sky-400 transition">Shipping</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-sky-400 transition">Returns Policy</Link></li>
              <li><Link to="/sitemap" className="text-gray-400 hover:text-sky-400 transition">Sitemap</Link></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="text-gray-400 hover:text-sky-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-sky-400 transition">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="text-gray-500 order-2 md:order-1 mt-4 md:mt-0">
            &copy; {currentYear} **TechSurvi Store**. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-gray-400 order-1 md:order-2">
            <a 
              href="https://github.com/vishnuvr16/techsurvi"
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-sky-400 transition flex items-center gap-1"
            >
              <Github className="w-5 h-5" />
              Vishnu's GitHub
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}