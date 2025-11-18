import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition p-4 flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-1 flex items-center justify-center">
        <img src={product.image} alt={product.title} className="max-h-40 object-contain" />
      </Link>
      <div className="mt-4">
        <Link to={`/product/${product.id}`} className="block font-medium text-sm hover:underline">
          {product.title.length > 70 ? product.title.slice(0, 70) + "..." : product.title}
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-gray-500">{product.category}</div>
          <div className="font-semibold">{formatCurrency(product.price)}</div>
        </div>
      </div>
    </div>
  );
}
