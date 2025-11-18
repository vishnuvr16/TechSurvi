import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../redux/slices/productsSlice";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { Search, Filter, ArrowUpWideNarrow, ArrowDownWideNarrow, ChevronLeft, ChevronRight } from 'lucide-react'; 

const PRODUCTS_PER_PAGE = 10;

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.products);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState(""); 
  
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    if (status === "idle") dispatch(loadProducts());
  }, [dispatch, status]);

  let visible = items.slice();

  if (categoryFilter) {
    visible = visible.filter((p) => p.category === categoryFilter);
  }
  if (search) {
    const q = search.toLowerCase();
    visible = visible.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (priceSort === "asc") visible.sort((a, b) => a.price - b.price);
  if (priceSort === "desc") visible.sort((a, b) => b.price - a.price);

  const totalProducts = visible.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, search, priceSort]);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  
  const paginatedProducts = visible.slice(startIndex, endIndex);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; 
    let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let end = Math.min(totalPages, start + maxPagesToShow - 1);

    if (end - start + 1 < maxPagesToShow) {
        start = Math.max(1, end - maxPagesToShow + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100"> 
      <div className="container mx-auto px-6 py-8">
        
        {/* Filters and Search Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 p-4 bg-slate-800 rounded-xl shadow-lg">
          
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              className="w-full bg-slate-700 text-white rounded-lg pl-10 pr-4 py-3 border border-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition placeholder-gray-400"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            
            {/* Price Sort */}
            <div className="relative">
              {priceSort === 'asc' ? 
                <ArrowUpWideNarrow className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sky-400" /> : 
                <ArrowDownWideNarrow className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sky-400" />
              }
              <select 
                className="bg-slate-700 text-white rounded-lg pl-10 pr-4 py-3 border border-slate-600 appearance-none focus:border-sky-500 cursor-pointer transition" 
                onChange={(e) => setPriceSort(e.target.value)} 
                value={priceSort}
              >
                <option value="" disabled>Sort by price</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sky-400" />
              <select 
                className="bg-slate-700 text-white rounded-lg pl-10 pr-4 py-3 border border-slate-600 appearance-none focus:border-sky-500 cursor-pointer transition"
                onChange={(e) => setCategoryFilter(e.target.value)}
                value={categoryFilter}
              >
                <option value="">All categories</option>
                {
                  [...new Set(items.map(i => i.category))].map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))
                }
              </select>
            </div>

          </div>
        </div>

        {status === "loading" && <Loading text="Loading products..." className="text-sky-400" />}
        {status === "failed" && (
          <div className="p-4 bg-red-800 text-white rounded-lg shadow-md">
            ⚠️ Failed to load products: **{error}**
          </div>
        )}
        
        {/* Product Grid */}
        {status === "succeeded" && (
          <>
            {paginatedProducts.length === 0 && totalProducts > 0 ? (
                <div className="text-center p-10 bg-slate-800 rounded-xl">
                    <h2 className="text-2xl font-bold text-sky-400">No Products on this Page</h2>
                    <p className="text-gray-400 mt-2">Try going back to a previous page.</p>
                </div>
            ) : totalProducts === 0 ? (
                <div className="text-center p-10 bg-slate-800 rounded-xl">
                    <h2 className="text-2xl font-bold text-sky-400">No Products Found</h2>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {paginatedProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 space-x-2">
                
                {/* Previous Button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-50 transition"
                >
                  <ChevronLeft className="w-5 h-5 text-sky-400" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      pageNumber === currentPage
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/40'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-50 transition"
                >
                  <ChevronRight className="w-5 h-5 text-sky-400" />
                </button>
              </div>
            )}

          </>
        )}
      </div>
    </div>
  );
}