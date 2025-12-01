import React, { createContext, useState, useEffect } from "react";
import API from "../api/api"; // your Axios instance
import Loader from '../components/loader'

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filtered, setFiltered] = useState([]);
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


  // filter product 
  // filter product 
  const filterByCategory = async ({ parent, main, sub }) => {
    try {
      let query = `/api/products/filter?parent=${parent}`;
      if (main) query += `&main=${main}`;
      if (sub) query += `&sub=${sub}`;

      const res = await API.get(query);
      setFiltered(res.data.data);  // store filtered products
    } catch (err) {
      console.log("Filter error:", err);
    }
  };



  // Add new product to state
  const addProduct = (product) => {
    setProducts((prev) => [product, ...prev]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setVisibleCount(20);
  }, [filtered, products]);

  const loadMoreProducts = () => {
    setLoadingMore(true);

    setTimeout(() => {
      setVisibleCount(prev => prev + 20); // load next 20 products
      setLoadingMore(false);
    }, 1200); // show loader delay
  };

  return (
    <ProductContext.Provider value={{
      products, setProducts, addProduct, loading, error, filtered, filterByCategory, loadMoreProducts,
      visibleCount,
      loadingMore
    }}>
      {loading ? <Loader /> : children}
    </ProductContext.Provider>
  );
};
