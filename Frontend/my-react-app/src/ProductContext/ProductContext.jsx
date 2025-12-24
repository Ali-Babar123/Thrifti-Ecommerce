import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../api/api";
import Loader from "../components/loader";
import { AuthContext } from "../Contexts/AuthProvider";

export const ProductContext = createContext();


export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [likedProducts, setLikedProducts] = useState({});
  const [likesCount, setLikesCount] = useState({});
const { isLoggedIn } = useContext(AuthContext);


  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/products/getAll");
      setProducts(res.data.data);
    } catch (err) {
      console.log("Fetch error:", err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // RESET visible count when filtered list changes
  useEffect(() => {
    setVisibleCount(20);
  }, [filtered]);

  // Load more on scroll
  const loadMoreProducts = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 20);
      setLoadingMore(false);
    }, 800);
  };

  // ⭐ MASTER FILTER FUNCTION — all pages will use this
  const applyFilters = ({
    parent,
    main,
    sub,
    brand = [],
    colors = [],
    materials = [],
    sizes = [],
    condition = [],
    priceRange = [],
    sort = "",
  }) => {
    let result = products;

    // Category
 // Category (case-insensitive)
const normalize = (str) => str?.toLowerCase().trim();

if (parent)
  result = result.filter(
    (p) => normalize(p.category?.parent) === normalize(parent)
  );

if (main)
  result = result.filter(
    (p) => normalize(p.category?.main) === normalize(main)
  );

if (sub)
  result = result.filter(
    (p) => normalize(p.category?.sub) === normalize(sub)
  );


    // Brand
    if (brand.length)
      result = result.filter((p) => brand.includes(p.brand));

    // Colors
    if (colors.length)
      result = result.filter((p) =>
        colors.some((c) => p.colors?.includes(c))
      );

    // Materials
    if (materials.length)
      result = result.filter((p) =>
        materials.some((m) => p.materials?.includes(m))
      );

    // Sizes
    if (sizes.length)
      result = result.filter((p) => sizes.includes(p.size));

    // Condition
    if (condition.length)
      result = result.filter((p) => condition.includes(p.condition));

    // Price
    if (priceRange.length === 2) {
  const min = Number(priceRange[0]) || 0;
  const max = Number(priceRange[1]) || Infinity;
  result = result.filter((p) => p.price >= min && p.price <= max);
}

    // Sorting
    if (sort === "Price Low to High") result.sort((a, b) => a.price - b.price);
    if (sort === "Price High to Low") result.sort((a, b) => b.price - a.price);
    if (sort === "Newest") result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === "Oldest") result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    // Save filtered result
    setFiltered(result);
  };

  const addProduct = (product) => setProducts(prev => [...prev, product]);


  const likedProduct = async (productId) => {
    await API.post(`/api/likes/${productId}/like`);
  };


 const toggleLike = async (productId) => {
  const isLiked = likedProducts[productId];

  // 1️⃣ Optimistic UI update
  setLikedProducts(prev => ({
    ...prev,
    [productId]: !isLiked
  }));

  setLikesCount(prev => ({
    ...prev,
    [productId]: (prev[productId] ?? 0) + (isLiked ? -1 : 1)
  }));

  // 🔥 THIS IS THE MISSING PART
  setProducts(prev =>
    prev.map(p =>
      p._id === productId
        ? {
            ...p,
            likes: Array(
              (likesCount[productId] ?? p.likes?.length ?? 0) +
                (isLiked ? -1 : 1)
            ).fill("x") // dummy, length matters only
          }
        : p
    )
  );

  try {
    if (isLiked) {
      await API.delete(`/api/likes/${productId}/unlike`);
    } else {
      await API.post(`/api/likes/${productId}/like`);
    }
  } catch (err) {
    // rollback
    setLikedProducts(prev => ({
      ...prev,
      [productId]: isLiked
    }));
  }
};



  // Load likes for logged-in users
  useEffect(() => {
  if (!products.length) return;

  // 🧹 USER LOGGED OUT → CLEAR LIKES
  if (!isLoggedIn) {
    setLikedProducts({});
    setLikesCount({});
    return;
  }

  const loadLikes = async () => {
    const likesMap = {};
    const countMap = {};

    for (const p of products) {
      try {
        const res = await API.get(`/api/likes/${p._id}/like-status`);
        likesMap[p._id] = res.data.liked;
        countMap[p._id] = res.data.likes;
      } catch {
        likesMap[p._id] = false;
        countMap[p._id] = p.likes?.length || 0;
      }
    }

    setLikedProducts(likesMap);
    setLikesCount(countMap);
  };

  loadLikes();
}, [products, isLoggedIn]);



  return (
    <ProductContext.Provider
      value={{
        products,
        filtered,
        addProduct,
        applyFilters,
        loading,
        error,
        visibleCount,
        loadingMore,
        loadMoreProducts,
        likedProduct,
        toggleLike,
        likesCount,
        likedProducts
      }}
    >
      {loading ? <Loader /> : children}
    </ProductContext.Provider>
  );
};
