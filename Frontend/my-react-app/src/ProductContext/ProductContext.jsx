import React, { createContext, useState, useEffect, useContext, useRef } from "react";
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
  const likesLoadedRef = useRef(0);

  /** Delay Function */
  const Delay = (fc,ms) => {
    return new Promise( (resolve,reject) => {
      setTimeout( async () => {
        try {
          const result = await fc();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      },ms )
    })
  }

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await Delay( () => API.get("/api/products/getAll"),5000);
      console.log(res)
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

  // Initialize global like counts from product data (for both logged-in and non-logged-in users)
  useEffect(() => {
    if (!products?.length) return;
    
    // Initialize like counts from product data if not already set
    setLikesCount(prev => {
      const newCounts = { ...prev };
      let hasUpdates = false;
      
      for (const p of products) {
        if (newCounts[p._id] === undefined) {
          // Use product's likes array length if available
          newCounts[p._id] = p.likes?.length || 0;
          hasUpdates = true;
        }
      }
      
      return hasUpdates ? newCounts : prev;
    });
  }, [products]);

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

  // 1️⃣ Optimistic UI update - update state immediately
  setLikedProducts(prev => ({
    ...prev,
    [productId]: !isLiked
  }));

  setLikesCount(prev => ({
    ...prev,
    [productId]: (prev[productId] ?? 0) + (isLiked ? -1 : 1)
  }));

  try {
    if (isLiked) {
      await API.delete(`/api/likes/${productId}/unlike`);
    } else {
      await API.post(`/api/likes/${productId}/like`);
    }
    // After successful API call, update the count from response if available
    // The optimistic update already handled the UI, so we just need to confirm
  } catch (err) {
    // rollback on error
    setLikedProducts(prev => ({
      ...prev,
      [productId]: isLiked
    }));
    setLikesCount(prev => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) + (isLiked ? 1 : -1)
    }));
  }
};



  // Load likes for logged-in users - only on initial load or when login status changes
  useEffect(() => {
  if (!products?.length) return;

  // 🧹 USER LOGGED OUT → CLEAR ONLY USER-SPECIFIC LIKES (not global counts)
  if (!isLoggedIn) {
    // Only clear which products the user liked (user-specific state)
    setLikedProducts({});
    // DO NOT clear likesCount - it's the global count of likes per product and should persist
    // setLikesCount({}); // REMOVED - keep global like counts
    likesLoadedRef.current = 0;
    return;
  }

  // Only load likes once when products are first available, or when user logs in
  // This prevents overwriting optimistic updates from toggleLike
  const currentProductsLength = products.length;
  const lastLoadedLength = likesLoadedRef.current || 0;
  
  // Skip if we've already loaded likes for this number of products and we have likes data
  if (lastLoadedLength === currentProductsLength && lastLoadedLength > 0 && Object.keys(likedProducts).length > 0) {
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
        // Use existing count if available, otherwise fall back to product's likes array length
        countMap[p._id] = likesCount[p._id] ?? (p.likes?.length || 0);
      }
    }

    setLikedProducts(likesMap);
    // Merge with existing counts to preserve global like counts
    setLikesCount(prev => ({ ...prev, ...countMap }));
    likesLoadedRef.current = currentProductsLength;
  };

  loadLikes();
  // Only depend on products.length and isLoggedIn to avoid reloading on every products change
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [products.length, isLoggedIn]);



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
      {children}
    </ProductContext.Provider>
  );
};
