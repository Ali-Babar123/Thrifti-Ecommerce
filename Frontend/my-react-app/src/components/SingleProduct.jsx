import React, { useState, useContext, useEffect } from "react";
import "./SingleProduct.css";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";
import NewWomen from "../assets/newwomen.svg";
import userEmptyState from '/user-empty-state.svg'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loading from './loader'
import API from '../api/api'
import { AuthContext } from "../Contexts/AuthProvider";
import LoginModal from "./LoginModal";
import { FollowContext } from "../FollowContext/FollowProvider";
import useCreateChat from "../hooks/useCreateChat";

function ProductPage() {
  const { id } = useParams();
  const { products, loading, visibleCount, loadingMore, likedProducts, likesCount, toggleLike, loadMoreProducts } = useContext(ProductContext);
  const [singleProduct, setSingleProduct] = useState(null);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [pendingFollowSeller, setPendingFollowSeller] = useState(null);

  const visibleProducts = products.slice(0, visibleCount);
  const [recommended, setRecommended] = useState([]);

  const { isLoggedIn } = useContext(AuthContext);
  const {followUser, unfollowUser, followingMap, loadFollowState, loadFollowCounts } = useContext(FollowContext);
  const { CreateChat } = useCreateChat();

  const [pendingLikeId, setPendingLikeId] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  const sellerId = singleProduct?.user?._id;
  
  const delay = (fn, ms) =>
    new Promise(resolve =>
      setTimeout(() => resolve(fn()), ms)
  );

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  // Load follow state when sellerId is available
  useEffect(() => {
    if (sellerId && isLoggedIn) {
      loadFollowState(sellerId);
      loadFollowCounts(sellerId);
    }
  }, [sellerId, isLoggedIn, loadFollowState, loadFollowCounts]);

  useEffect(()=>{
    if(!id) return;

    const fetchRecommended = async ()=>{
      const res = await API.get(`/api/products/${id}/recommended`);
      console.log("recomended", res);
      setRecommended(res.data.data)
    }
    fetchRecommended();

  }, [id]);

  const handleToggleLike = (productId) => {
    if (!isLoggedIn) {
      setPendingLikeId(productId);
      setAuthModalOpen(true);
      return;
    }

    toggleLike(productId);
  };


  const handleLoginSuccess = () => {
    setAuthModalOpen(false);

    if (pendingLikeId) {
      toggleLike(pendingLikeId);
      setPendingLikeId(null);
    }
     // ✅ Auto Follow
  if (pendingFollowSeller) {
    followUser(pendingFollowSeller);
    setPendingFollowSeller(null);
  }
  }



  const fetchSingleProduct = async () => {
    try {
      const res = await API.get(`/api/products/single/${id}`);

      // If product not found
      if (!res.data.success || !res.data.data) {
        console.log("Product not found");
        setSingleProduct(null);
        setSellerProducts([]);
        return;
      }

      // Set product in state
      setSingleProduct(res.data.data);

      // Check if user exists BEFORE fetching seller products
      if (res.data.data.user && res.data.data.user._id) {
        fetchSellerProducts(res.data.data.user._id);
      } else {
        setSellerProducts([]);
      }

    } catch (err) {
      console.log("Single product error:", err);
      setSingleProduct(null);
      setSellerProducts([]);
    }
  };




  const fetchSellerProducts = async (userId) => {
    try {
      const res = await API.get(`/api/products/${userId}`);
      setSellerProducts(res.data.data);
    } catch (err) {
      console.log("Seller products error:", err);
    }
  };


  if (loading) {
    return <p>Loading...</p>; // later replace with your Loader component
  }

  const product = products.find((p) => p._id === id);

  // 2️⃣ If no product after loading
  if (!product) {
    return <Loading />
  }
  const navigate = useNavigate();

  const handleAskSeller = async () => {
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }

    const sellerId = singleProduct?.user?._id;
    if (!sellerId) {
      alert("Seller information not available");
      return;
    }

    setIsCreatingChat(true);
    try {
      const result = await CreateChat({ userId: sellerId });
      if (result.success) {
        // Navigate to inbox with the chat ID in state
        // The Messages component will select this chat when it loads
        navigate("/inbox", { state: { chatId: result.data._id } });
      } else {
        alert(result.error || "Failed to create chat");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("Failed to create chat. Please try again.");
    } finally {
      setIsCreatingChat(false);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    navigate("/checkout", { state: { product } });
  };

  const [mainImage, setMainImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    if (product?.images?.[0]) {
      setMainImage(product.images[0]);
    }
  }, [product]);





  // You can put this inside your ProductPage.js or in a separate utils file
  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval > 1 ? "s" : ""} ago`;

    return "Just now";
  };

  useEffect(() => {
    console.log("Single product data:", singleProduct);
    console.log("Seller data:", singleProduct?.user);
  }, [singleProduct]);

  return (
    <>
      <div className="product-page">
        <p className="breadcrumb">
          <Link to='/'>Home</Link> / <Link to={`/category?parent=${singleProduct?.category?.parent}`}>{singleProduct?.category?.parent} </Link> / <Link to={`/category?parent=${singleProduct?.category?.parent}&main=${singleProduct?.category?.main}`}> {singleProduct?.category?.main} </Link>/  <Link to={`/category?parent=${singleProduct?.category?.parent}&main=${singleProduct?.category?.main}&sub=${singleProduct?.category?.sub}`}>{singleProduct?.category?.sub} </Link> <span>{product.name}</span>
        </p>

        <div className="product-container">
          {/* Left - Images */}
          <div className="image-section">
            <div className="thumbnail-list">
              {product.images?.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt={`thumbnail-${img}`}
                  className={`thumbnail ${mainImage === img ? "active-thumbnail" : ""
                    }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>

            <div
              className="main-image"
              onClick={() => setIsLightboxOpen(true)}
            >
              {mainImage && <img src={mainImage} alt="main" />}
              <div className="singleproduct-rec-likes" onClick={(e) => { e.stopPropagation(); handleToggleLike(product._id); }}>
                {
                  likedProducts?.[product._id] ? (
                    <FaHeart size={16} color="black" />
                  ) : (
                    <FaRegHeart size={16} color="gray" />
                  )
                }
                <span className="count-likes">{likesCount?.[product._id] ?? product.likes?.length ?? 0}</span>
              </div>
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="details-section">
            <h2>{product.title}</h2>
            <p className="subtext">{product.condition} - {product.brand}</p>


            <div className="price">
              <span className="old-price">$70.00</span>
              <span className="new-price">${product.price}</span>
            </div>

            <p className="buyer-protection">Includes Buyer Protection</p>
            <button className="discount-btn">🚚 Upto -100% postage</button>

            <div className="product-info">
              <p>
                <strong>Brand</strong> {product.brand}
              </p>
              <p>
                <strong>Size</strong> {product.size}
              </p>
              <p>
                <strong>Condition</strong> {product.condition}
              </p>
              <p>
                <strong>Color</strong> {product.colors.join(", ")}
              </p>
              <p>
                <strong>Uploaded</strong> {timeAgo(product.createdAt)}
              </p>
            </div>

            <p className="brand-box">Brand new with box</p>

            <p className="postage">
              <strong>Postage:</strong> from £0.00
            </p>

            <div className="discount-info">
              <p>
                Get discounts of up to 100% off for pick-up point delivery.
              </p>
              <span>See further details at checkout.</span>
            </div>

            <div className="button-group-new">
              <button className="buy-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button className="offer-btn">Make an offer</button>
              <button 
                className="seller-btn-new" 
                onClick={handleAskSeller}
                disabled={isCreatingChat}
              >
                {isCreatingChat ? "Creating..." : "Ask Seller"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Member Items */}
      <section className="member-section">
        <div className="member-left">
          <h2>Member's items ({sellerProducts.length})</h2>

          <div className="bundle-actions">
            <div className="left-actions">
              <p className="shop-btn">Shop Bundles</p>
              <p className="save-text">Save on Postage</p>
            </div>
            <button className="create-btn">Create Bundles</button>
          </div>

          <div className="items-grid">
            {sellerProducts?.slice(0, 20).map((item) => (
              <div className="item-card" key={item._id}>
                <img src={item.images[0]} alt="seller item" />

                <div className="rec-info">
                  <div className="rec-details">
                    <p className="rec-name">{item.title}</p>
                    <p className="rec-condition">{item.size} - {item.condition}</p>
                  </div>
                  <p className="rec-price">{item.price}</p>
                </div>
              </div>
            ))}

          </div>

         <div className="top-picks-more">
    {loadingMore ? (
      <div className="circle-loader"></div>
    ) : (
      <button onClick={loadMoreProducts}>See More</button>
    )}
  </div>
        </div>

        {/* Seller Info */}
        <div className="member-right">
          <div className="buyer-protection">
            <h4>Buyer Protection Fee</h4>
            <p>
              Our Buyer Protection is added to every purchase made with the "Buy
              now" button. Includes our <a href="#">Refund Policy</a>.
            </p>
          </div>


          {singleProduct ? (
            <div className="seller-card">
              <div className="seller-header">
                <Link className="seller-Link" to={`/member/${singleProduct.user?._id}`}>
                  <img
                                      onError={ (e) => e.target.src = userEmptyState}
                  userEmptyState
                    src={singleProduct.user?.profileImage || userEmptyState}
                    alt="seller"
                    className="seller-img"
                  />
                </Link>
                <div>
                  <Link to={`/member/${singleProduct.user?._id}`} className="seller-Link">
                    <p className="seller-name">@{singleProduct.user?.username}</p>
                  </Link>
                  <p className="seller-rating">⭐⭐⭐⭐⭐</p>
                </div>
              </div>
              <div className="seller-body">
                 <hr className="seller-divider" /> 
                 <p className="speedy">🚚 Speedy Shipping</p>
                  <p>Sends items promptly — usually within 24 hours.</p> 
                  <hr className="seller-divider" /> <p>📍{singleProduct.user?.location?.city}, {singleProduct.user?.location?.country}</p> 
                  <p>🕒 {timeAgo(singleProduct.user?.lastSeen)} </p> <hr className="seller-divider" /> 
            <div className="single-follow-btn">
             <button
  className={`new-btn ${followingMap[sellerId] ? "UnFollow" : ""}`}
  onClick={() => {
    if (!isLoggedIn) {
       setPendingFollowSeller(sellerId); // 👈 seller save
      setAuthModalOpen(true);
      return;
    }

    followingMap[sellerId]
      ? unfollowUser(sellerId)
      : followUser(sellerId);
  }}
>
  {followingMap[sellerId] ? "unFollow" : "Follow"}
</button>
</div>

              </div>

            </div>
          ) : (
            <p>Product not found</p>
          )}



          <div className="buyer-notice">
            <p>
              Consumer protection laws do not apply to your purchases from other consumers. More specifically, the right to cancel (section 29(1) of the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013) and the right to reject (section 20 of the Consumer Rights Act) does not apply. Buyer’s rights are significantly reduced when a sale is carried out between two individuals. More specifically, the following sections of the Consumer Rights Act 2015 do not apply: goods to be of satisfactory quality (section 9 of the Consumer Rights Act) and fit for a particular purpose (section 10 of the Consumer Rights Act). Goods from private sellers do not have to be fault-free and if defects or marks were clearly mentioned by the seller or are visible in the seller’s photograph, then you do not have a case against the seller. However, if the seller’s goods do not match the description, you have the right to ask for a refund or compensation. Every purchase you make using the ‘Buy now’ button is covered by our Buyer Protection service.
            </p>
            <p>
              Every purchase using the “Buy now” button is covered by our{" "}
              <a href="#">Buyer Protection</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <div className="rec-section">
        <div className="rec-header">
          <h2 className="rec-title">Recommended Products</h2>
          <a href="#" className="rec-view-all">
            View All
          </a>
        </div>

        <div className="rec-grid" >
          {recommended?.map((p) => (
            <div key={p._id} className="rec-card"
            onClick={() =>
          navigate(`/singleproduct/${p._id}`, { state: p })
        }>
              <div className="rec-img-box">
                {/* {p.images.slice(0, 4).map((img) => (
                  <img key={img} src={img} alt={img} className="rec-img" />
                ))} */}
                <img  src={p?.images[0]} className="rec-img" />
               <div className="singleproduct-rec-likes" onClick={(e) => { e.stopPropagation(); handleToggleLike(p._id); }}>
                {
                  likedProducts?.[p._id] ? (
                    <FaHeart size={16} color="black" />
                  ) : (
                    <FaRegHeart size={16} color="gray" />
                  )
                }
                <span className="count-likes">{likesCount?.[p._id] ?? 0}</span>
              </div>
                 
              </div>

              <div className="rec-info">
                <div className="rec-details">
                  <p className="rec-name">{p.title}</p>
                  <p className="rec-condition">{p.size} - {p.condition}</p>
                </div>
                <p className="rec-price">{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="top-picks-more">
          {loadingMore ? (
            <div className="circle-loader"></div>
          ) : (
            <button onClick={loadMoreProducts}>See More</button>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-arrow left"
              onClick={() =>
                setCurrentIndex(
                  currentIndex === 0
                    ? product.images.length - 1
                    : currentIndex - 1
                )
              }
            >
              <FaChevronLeft size={15} color="white" />
            </button>

            <img
              src={product.images[currentIndex]}
              alt={`gallery-${currentIndex}`}
              className="lightbox-image"
            />

            <button
              className="lightbox-arrow right"
              onClick={() =>
                setCurrentIndex(
                  currentIndex === product.images.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <FaChevronRight size={15} color="white" />
            </button>

            <button
              className="lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </>
  );
}

export default ProductPage;
