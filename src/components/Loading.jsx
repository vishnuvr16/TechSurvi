import React from "react";
import { Loader } from 'lucide-react';

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="w-full py-20 flex justify-center items-center">
      <div className="flex flex-col items-center space-y-4">
        
        <div className="relative">

          <div className="w-12 h-12 border-4 border-slate-700 border-t-slate-700 rounded-full"></div>
          
          <div 
            className="absolute top-0 left-0 w-12 h-12 border-4 border-t-sky-500 border-r-sky-500 border-transparent rounded-full animate-spin"
          ></div>
          
          <Loader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-sky-400 animate-pulse" />
        </div>
        
        {/* Loading Text */}
        <div className="text-lg font-medium text-sky-400 animate-pulse">
          {text}
        </div>

      </div>
    </div>
  );
}