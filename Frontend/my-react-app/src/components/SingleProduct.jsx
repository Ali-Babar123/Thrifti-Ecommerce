import React, { useState, useContext, useEffect } from "react";
import "./SingleProduct.css";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { ProductContext } from "../ProductContext/ProductContext";
import NewWomen from "../assets/newwomen.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loading from './loader'

function ProductPage() {
  const { id } = useParams();
  const { products, loading } = useContext(ProductContext);
  
  
  if (loading) {
    return <p>Loading...</p>; // later replace with your Loader component
  }
  
  const product = products.find((p) => p._id === id);

  // 2️⃣ If no product after loading
  if (!product) {
    return <Loading/>
  }
  const navigate = useNavigate();

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



  return (
    <>
      <div className="product-page">
        <p className="breadcrumb">
          Home / Men / All / <span>{product.name}</span>
        </p>

        <div className="product-container">
          {/* Left - Images */}
          <div className="image-section">
            <div className="thumbnail-list">
              {product.images.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt={`thumbnail-${img}`}
                  className={`thumbnail ${
                    mainImage === img ? "active-thumbnail" : ""
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
              <div className="likes">
                <FaHeart color="black" size={14} /> {product.likes}
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
              <button className="seller-btn-new">Ask Seller</button>
            </div>
          </div>
        </div>
      </div>

      {/* Member Items */}
      <section className="member-section">
        <div className="member-left">
          <h2>Member's items ({product.images.length})</h2>

          <div className="bundle-actions">
            <div className="left-actions">
              <p className="shop-btn">Shop Bundles</p>
              <p className="save-text">Save on Postage</p>
            </div>
            <button className="create-btn">Create Bundles</button>
          </div>

          <div className="items-grid">
            {product.images.slice(0, 2).map((img) => (
              <div className="item-card" key={img}>
                <img src={img} alt={`gallery-${img}`} />
                <div className="product-content">
                  <div className="name-des">
                    <p className="item-title">{product.title}</p>
                    <p className="item-condition">{product.size} - {product.condition}</p>
                  </div>
                  <p className="item-price">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="see-more-btn">See More</button>
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

          <div className="seller-card">
            <div className="seller-header">
              <img src={NewWomen} alt="seller" className="seller-img" />
              <div>
                <p className="seller-name">@fashion store</p>
                <p className="seller-rating">⭐⭐⭐⭐⭐</p>
              </div>
            </div>

            <div className="seller-body">
              <hr className="seller-divider" />
              <p className="speedy">🚚 Speedy Shipping</p>
              <p>Sends items promptly — usually within 24 hours.</p>
              <hr className="seller-divider" />
              <p>📍 Manchester, United Kingdom</p>
              <p>🕒 Last seen 8 hours ago</p>
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

        <div className="rec-grid">
          {products.map((p) => (
            <div key={p._id} className="rec-card">
              <div className="rec-img-box">
                {p.images.slice(0, 4).map((img) => (
                  <img key={img} src={img} alt={img} className="rec-img" />
                ))}

                <div className="rec-likes">
                  <FaHeart color="black" size={14} /> {p.likes}
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

        <button className="rec-button">See More</button>
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
    </>
  );
}

export default ProductPage;
