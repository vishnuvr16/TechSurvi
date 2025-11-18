import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../redux/slices/productsSlice";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.products);

  // simple client-side filters for bonus
  const [categoryFilter, setCategoryFilter] = useState("");
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState(""); // asc, desc

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

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex gap-3 items-center">
          <input
            className="border rounded px-3 py-2"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="border rounded px-3 py-2" onChange={(e) => setPriceSort(e.target.value)} value={priceSort}>
            <option value="">Sort by price</option>
            <option value="asc">Low to high</option>
            <option value="desc">High to low</option>
          </select>
          <select className="border rounded px-3 py-2"
            onChange={(e) => setCategoryFilter(e.target.value)}
            value={categoryFilter}
          >
            <option value="">All categories</option>
            {
              // build category list from items
              [...new Set(items.map(i => i.category))].map(cat => <option key={cat} value={cat}>{cat}</option>)
            }
          </select>
        </div>
      </div>

      {status === "loading" && <Loading text="Loading products..." />}
      {status === "failed" && (
        <div className="text-red-500">Failed to load products: {error}</div>
      )}

      {status === "succeeded" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
