import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { loadProductById, clearSelected } from "../redux/slices/productsSlice";
import { addToCart } from "../redux/slices/cartSlice";
import Loading from "../components/Loading";
import { formatCurrency } from "../utils/format";
import { ShoppingCart, Star, Tag, Zap } from 'lucide-react'; 

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, selectedStatus, selectedError } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(loadProductById(id));
    return () => dispatch(clearSelected()); 
  }, [dispatch, id]);

  const onAdd = () => dispatch(addToCart(selected));

  const renderRating = (rate) => {
    if (!rate) return null;
    const fullStars = Math.round(rate);
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 transition duration-200 ${
          i < fullStars ? 'fill-amber-400 stroke-amber-400' : 'fill-transparent stroke-gray-500'
        }`} 
      />
    ));
  };


  if (selectedStatus === "loading") return <Loading text="Loading product details..." />;
  
  if (selectedStatus === "failed") {
    return (
      <div className="min-h-screen bg-slate-900 text-gray-100 py-16">
        <div className="container mx-auto px-6 p-4 bg-red-900/40 rounded-xl border border-red-700">
          <div className="text-2xl font-semibold text-red-400">🚨 Error Loading Product</div>
          <p className="mt-2 text-red-300">Details: {selectedError || "An unexpected error occurred."}</p>
          <Link to="/" className="mt-4 inline-block text-sky-400 hover:underline">Go back to products</Link>
        </div>
      </div>
    );
  }

  if (!selected) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 py-8">
      <div className="container mx-auto px-6">
        <div className="bg-slate-800 rounded-xl shadow-2xl p-6 md:p-10 flex flex-col lg:flex-row gap-10 border border-slate-700">
          {/* left side */}
          <div className="lg:w-2/5 flex items-center justify-center bg-slate-700/50 rounded-lg p-8">
            <img 
              src={selected.image} 
              alt={selected.title} 
              className="max-h-[28rem] w-full object-contain transition duration-500 hover:scale-[1.03]" 
            />
          </div>
          {/* right sides */}
          <div className="lg:w-3/5">
            <h1 className="text-4xl font-extrabold text-white leading-tight">
              {selected.title}
            </h1>
            
            <div className="mt-3 flex items-center space-x-6 text-sm">
              {/* Rating */}
              <div className="flex items-center gap-1 text-gray-300">
                {renderRating(selected.rating?.rate)}
                <span className="font-semibold text-sky-400 ml-1">
                    {selected.rating?.rate?.toFixed(1) ?? "N/A"}
                </span>
                <span className="text-gray-500">
                    ({selected.rating?.count ?? 0} reviews)
                </span>
              </div>
              
              {/* Category */}
              <div className="flex items-center gap-1 text-gray-400 uppercase tracking-wider">
                <Tag className="w-4 h-4 text-sky-500" />
                {selected.category}
              </div>
            </div>

            <hr className="my-6 border-slate-700" />

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
                <span className="text-sm font-semibold text-gray-400">Price:</span>
                <span className="text-5xl font-extrabold text-sky-500">
                    {formatCurrency(selected.price)}
                </span>
                <span className="text-xl text-green-500 font-semibold ml-2 flex items-center">
                    <Zap className="w-6 h-6 mr-1" /> In Stock
                </span>
            </div>

            {/* Description */}
            <h3 className="text-xl font-semibold text-white mb-2">Product Overview</h3>
            <p className="mt-2 text-gray-400 leading-relaxed border-b border-slate-700 pb-6">
              {selected.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              <button 
                onClick={onAdd} 
                className="flex-1 px-8 py-3 rounded-lg bg-sky-600 text-white font-bold text-lg 
                           hover:bg-sky-500 transition shadow-lg shadow-sky-600/40 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              
              <Link
                to="/cart"
                onClick={() => dispatch(addToCart(selected))}
                className="flex-1 px-8 py-3 rounded-lg border border-slate-600 bg-slate-700 text-gray-300 font-medium 
                           hover:bg-slate-600 transition flex items-center justify-center gap-2"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}