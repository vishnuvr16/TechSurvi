import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadProductById, clearSelected } from "../redux/slices/productsSlice";
import { addToCart } from "../redux/slices/cartSlice";
import Loading from "../components/Loading";
import { formatCurrency } from "../utils/format";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, selectedStatus, selectedError } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(loadProductById(id));
    return () => dispatch(clearSelected());
  }, [dispatch, id]);

  if (selectedStatus === "loading") return <Loading text="Loading product..." />;
  if (selectedStatus === "failed") return <div className="p-4 text-red-500">Error: {selectedError}</div>;
  if (!selected) return null;

  const onAdd = () => dispatch(addToCart(selected));

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded shadow p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex items-center justify-center">
          <img src={selected.image} alt={selected.title} className="max-h-96 object-contain" />
        </div>

        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold">{selected.title}</h2>
          <div className="mt-2 flex items-center gap-4">
            <div className="text-xl font-bold">{formatCurrency(selected.price)}</div>
            <div className="text-sm text-gray-500">Category: {selected.category}</div>
            <div className="text-sm text-gray-600">Rating: {selected.rating?.rate ?? "N/A"} ({selected.rating?.count ?? 0})</div>
          </div>

          <p className="mt-4 text-gray-700">{selected.description}</p>

          <div className="mt-6 flex gap-3">
            <button onClick={onAdd} className="px-4 py-2 rounded bg-blue-600 text-white hover:opacity-95">Add to cart</button>
            <a href="#cart" onClick={() => dispatch(addToCart(selected))} className="px-4 py-2 rounded border">Add & view</a>
          </div>
        </div>
      </div>
    </div>
  );
}
