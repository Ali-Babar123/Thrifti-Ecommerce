import React, { useState } from "react";
import "./ListingSingleProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Link, X } from "lucide-react";
import DummyImage from "../assets/shirtofmen.svg"; // replace with your own
import DeleteItemPopup from "./DeleteItemPopup";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect } from "react";
import API from "../api/api";
import Loader from "./loader";
import { useContext } from "react";
import { ProductContext } from "../ProductContext/ProductContext";
import LoginModal from "./LoginModal";
import userEmptyState from '/user-empty-state.svg'
import { AuthContext } from "../Contexts/AuthProvider";

function ListingSingleProductPage() {
  const dummyGallery = [DummyImage, DummyImage, DummyImage, DummyImage];
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(dummyGallery[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false); 
    const [sellerProducts, setSellerProducts] = useState([]);
    const {likedProducts, likesCount, toggleLike} = useContext(ProductContext);
      const [authModalOpen, setAuthModalOpen] = useState(false);

      const {isLoggedIn} = useContext(AuthContext);
    


  const [showBumpModal, setShowBumpModal] = useState(false);
  const navigate = useNavigate();
  

  useEffect(()=>{
    const fetchProducts = async ()=>{
      try {
        const res = await API.get(`/api/products/single/${id}`);
        console.log(res.data.data);
        if (res.data.success && res.data.data) {
  setProduct(res.data.data);
} else {
  setProduct(null);
   setSellerProducts([]);

}




// Check if user exists BEFORE fetching seller products
    if (res.data.data.user && res.data.data.user._id) {
      fetchSellerProducts(res.data.data.user._id);
    } else {
      setSellerProducts([]);
    }

      } catch (error) {
       console.error("Error fetching product:", error); 
      }
      finally {
      setLoading(false);
    }
    };
    fetchProducts()
  }, [id]);

  const fetchSellerProducts = async(userId) =>{
    try {
      const res = await API.get(`/api/products/${userId}`);
      // console.log(res.data.data);
      setSellerProducts(res.data.data);
    } catch (error) {
      console.error("seller product error", error)
      
    }
  }


   useEffect(() => {
      if (product?.images?.[0]) {
        setMainImage(product.images[0]);
      }
    }, [product]);


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
  }


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

  if (loading) return <p><Loader/></p>;
  if (!product) return <p>Product not found</p>;


  return (
    <>
      <div className="product-page">
        <p className="breadcrumb">
          Home / Men / All / <span>Classic Black Jacket</span>
        </p>

        <div className="product-container">
          {/* Left Side */}
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
                        <div className="likes" onClick={(e) => { e.stopPropagation(); handleToggleLike(product._id); }}>
                           {
                                            likedProducts?.[product._id] ? (
                                              <FaHeart size={16} color="black" />
                                            ) : (
                                              <FaRegHeart size={16} color="gray" />
                                            )
                                          }
                                          <span className="count-likes">{likesCount?.[product._id] ?? 0}</span>
                        </div>
                      </div>
                    </div>

          {/* Right Side */}
          <div className="details-section">
            <div className="check-progress" >
              <button className="buy-btn" style={{width: '100%', marginBottom: '15px'}}>Check in Progress</button>
              </div>
            <h2>{product.title}</h2>
            <p className="subtext">{product.condition} - {product.brand}</p>

            <div className="price">
              <span className="old-price">$70.00</span>
              <span className="new-price">{product.price}</span>
            </div>

            <p className="buyer-protection">Includes Buyer Protection</p>
            <button className="discount-btn">🚚 Upto -100% postage</button>

            <div className="product-info">
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Size:</strong> {product.size}</p>
              <p><strong>Condition:</strong> {product.condition}</p>
              <p><strong>Color:</strong>  {product.colors.join(", ")}</p>
              <p><strong>Uploaded:</strong> {timeAgo(product.createdAt)}</p>
            </div>

            <p className="brand-box">Brand new with box</p>

            <p className="postage"><strong>Postage:</strong> from £0.00</p>

            <div className="discount-info">
              <p>Get discounts of up to 100% off for pick-up point delivery.</p>
              <span>See further details at checkout.</span>
            </div>

            <div className="button-group-new">
              <button className="buy-btn" onClick={()=> setShowBumpModal(true)}>Bump</button>
              
              <button onClick={()=> navigate('/sold')} className="offer-btn">Mark as Sold</button>
              <button onClick={()=> navigate('/Reserved')} className="offer-btn">Mark as Reserved</button>
              <button className="offer-btn">Edit Listing</button>
              <button className="offer-btn">Hide</button>
              <button className="seller-btn-new" onClick={()=> setShowPopup(true)}>Delete</button>
               {showPopup && (
        <DeleteItemPopup
          onCancel={() => setShowPopup(false)}
          onConfirm={() => {
            alert("Item deleted!");
            setShowPopup(false);
          }}
        />
      )}
            </div>
          </div>
        </div>
      </div>

      {/* Member Section */}
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
            {sellerProducts?.slice(0, 2).map((item) => (
              <div className="item-card" key={item._id}>
                <img src={item.images[0]} alt={`gallery-${item}`} />
                <div className="product-content">
                  <div className="name-des">
                    <p className="item-title">{item.title}</p>
                    <p className="item-condition">{item.condition}</p>
                  </div>
                  <p className="item-price">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="see-more-btn">See More</button>
        </div>

        <div className="member-right">
          <div className="buyer-protection">
            <h4>Buyer Protection Fee</h4>
            <p>
              Our Buyer Protection is added for a fee to every purchase made
              with the "Buy now" button. Buyer Protection includes our{" "}
              <a href="#">Refund Policy</a>.
            </p>
          </div>

          <div className="seller-card">
            <div className="seller-header">
              <img src={product.user?.profileImage || userEmptyState}
                onError={ (e) => e.target.src = userEmptyState} loading="lazy" alt="seller" className="seller-img" />
              <div>
                <p className="seller-name">{product.user?.username}</p>
                <p className="seller-rating">⭐⭐⭐⭐⭐</p>
              </div>
            </div>

            <div className="seller-body">
              <hr className="seller-divider" />
              <p className="speedy">🚚 Speedy Shipping</p>
              <p>Sends items promptly — usually within 24 hours.</p>
              <hr className="seller-divider" />
              <p>📍 {product.user?.location?.city || "Unknown"}, {product.user?.location?.country || "Unknown"}</p>
              <p>🕒 {timeAgo(product.user?.lastSeen)}</p>
              <hr className="seller-divider" />
              <p className="follow-btn">Follow</p>
            </div>
          </div>

          <div className="buyer-notice">
            <p>
              Consumer protection laws do not apply to purchases from other
              consumers.
            </p>
            <p>
              Every purchase made using the “Buy now” button is covered by our{" "}
              <a href="#">Buyer Protection service</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-arrow left"
              onClick={() =>
                setCurrentIndex(
                  currentIndex === 0 ? dummyGallery.length - 1 : currentIndex - 1
                )
              }
            >
              <ChevronLeft size={18} color="white" />
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
                  currentIndex === dummyGallery.length - 1 ? 0 : currentIndex + 1
                )
              }
            >
              <ChevronRight size={18} color="white" />
            </button>

            <button
              className="lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X size={20} color="white" />
            </button>
          </div>
        </div>
      )}


      {showBumpModal && (
  <div className="bump-modal-overlay">
    <div className="bump-modal">
      
      <h2 className="bump-title">Choose your Bump</h2>

      <div className="bump-items">
        <div className="bump-item-card">
          <img src={mainImage} alt="selected item" />
          <p>Classic Black Jacket</p>
          <span>£20.00</span>
        </div>

        <div className="bump-upload-card">
          <label htmlFor="addMoreItems" className="bump-upload-box">
            +
          </label>
          <input
            type="file"
            id="addMoreItems"
            style={{ display: "none" }}
            multiple
            onChange={(e) => console.log(e.target.files)}
          />
          <p>Add more items</p>
        </div>
      </div>

      <div className="bump-options">
        <div className="bump-option">
          <p>3-Day Bump</p>
          <input type="radio" name="bump" defaultChecked />
        </div>

          <span className="best-tag">Best Value</span>
        <div className="bump-option highlight">
          <p>7-Day Bump</p>
          <input type="radio" name="bump" />
        </div>
      </div>

      <button className="review-btn" onClick={()=> navigate('/review-checkout')}>Review Order · £2.99</button>
      <button className="cancel-btn" onClick={() => setShowBumpModal(false)}>
        Cancel
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

export default ListingSingleProductPage;
