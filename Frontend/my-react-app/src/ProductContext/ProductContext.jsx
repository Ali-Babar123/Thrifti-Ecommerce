import React, { createContext, useState, useEffect } from "react";
import API from "../api/api"; // your Axios instance

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/products/getAll");
      setProducts(res.data.data); 
    } catch (err) {
      console.error("Failed to fetch products:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Add new product to state
  const addProduct = (product) => {
    setProducts((prev) => [product, ...prev]); 
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, addProduct, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};
