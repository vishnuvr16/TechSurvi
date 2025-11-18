import axios from "axios";

const API = axios.create({
  baseURL: "https://fakestoreapi.com"
});

export const fetchProducts = () => API.get("/products");
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const fetchCategories = () => API.get("/products/categories");
