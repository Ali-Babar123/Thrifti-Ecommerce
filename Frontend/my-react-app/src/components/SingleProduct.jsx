import React, { useState, useContext } from "react";
import "./SingleProduct.css";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { ProductContext } from "../ProductContext/ProductContext";
import NewWomen from '../assets/newwomen.svg'
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";


function ProductPage() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const product = products.find((p) => p.id === Number(id));
  const navigate = useNavigate();


  const handleBuyNow = (e) => {
    e.preventDefault(); // 👈 Prevent reload
    navigate("/checkout", { state: { product } }); // 👈 Pass inside an object
  };

  const [mainImage, setMainImage] = useState(product?.image);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
const [currentIndex, setCurrentIndex] = useState(0);


  if (!product) return <p>Product not found</p>;

  return (
    <>
      <div className="product-page">
        <p className="breadcrumb">
          Home / Men / All / <span>{product.name}</span>
        </p>

        <div className="product-container">
          {/* Left Side - Images */}
          <div className="image-section">
            <div className="thumbnail-list">
              {product.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumbnail-${index}`}
                  className={`thumbnail ${
                    mainImage === img ? "active-thumbnail" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>

            <div className="main-image" onClick={() => setIsLightboxOpen(true)}>
  <img src={mainImage} alt="main" />
  <div className="likes">
    <FaHeart color="black" size={14} /> {product.likes}
  </div>
</div>

          </div>

          {/* Right Side - Product Details */}
          <div className="details-section">
            <h2>{product.name}</h2>
            <p className="subtext">{product.condition}</p>

            <div className="price">
              <span className="old-price">$70.00</span>
              <span className="new-price">{product.price}</span>
            </div>

            <p className="buyer-protection">Includes Buyer Protection</p>

            <button className="discount-btn">🚚 Upto -100% postage</button>

            <div className="product-info">
              <p>
                <strong>Brand</strong>
              </p>
              <p>
                <strong>Size</strong> M
              </p>
              <p>
                <strong>Condition</strong> {product.condition}
              </p>
              <p>
                <strong>Color</strong> Black
              </p>
              <p>
                <strong>Uploaded</strong> 15 hours ago
              </p>
            </div>

            <p className="brand-box">Brand new with box</p>

            <p className="postage">
              <strong>Postage:</strong> from £0.00
            </p>

            <div className="discount-info">
              <p>Get discounts of up to 100% off for pick-up point delivery.</p>
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

      {/* Member Section */}
      <section className="member-section">
        {/* Left Side - Member's Items */}
        <div className="member-left">
          <h2>Member's items ({product.gallery.length})</h2>

          <div className="bundle-actions">
  <div className="left-actions">
    <p className="shop-btn">Shop Bundles</p>
    <p className="save-text">Save on Postage</p>
  </div>
  <button className="create-btn">Create Bundles</button>
</div>


          <div className="items-grid">
            {product.gallery.slice(0, 2).map((img, index) => (
              <div className="item-card" key={index}>
                <img src={img} alt={`gallery-${index}`} />
                <div className="product-content">
                  <div className="name-des">
                <p className="item-title">{product.name}</p>
                <p className="item-condition">{product.condition}</p>
                </div>
                <p className="item-price">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="see-more-btn">See More</button>
        </div>

        {/* Right Side - Seller Info */}
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
    <img src={NewWomen} alt="seller" className="seller-img" />
    <div>
      <p className="seller-name">@fashion store</p>
      <p className="seller-rating">⭐⭐⭐⭐⭐</p>
    </div>
  </div>

  <div className="seller-body">
    <hr className="seller-divider" />
    <p className="speedy">🚚 Speedy Shipping</p>
    <p>Sends items promptly — usually within the next 24 hours.</p>
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
              consumers. More specifically, the right to cancel under section
              29(1) of the Consumer Contracts Regulations 2013 and the right to
              reject under section 20 of the Consumer Rights Act does not apply.
            </p>
            <p>
              Every purchase made using the “Buy now” button is covered by our{" "}
              <a href="#">Buyer Protection service</a>.
            </p>
          </div>
        </div>
      </section>

       <div className="rec-section">
      <div className="rec-header">
        <h2 className="rec-title">Recommended Products</h2>
        <a href="#" className="rec-view-all">View All</a>
      </div>

      <div className="rec-grid">
        {products.map((product) => (
          <div key={product.id} className="rec-card">
            <div className="rec-img-box">
              {product.gallery.slice(0, 4).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`gallery-${index}`}
                  className="rec-img"
                />
              ))}
              <div className="rec-likes"><FaHeart color="black" size={14} /> {product.likes}</div>
            </div>

            <div className="rec-info">
              <div className="rec-details">
                <p className="rec-name">{product.name}</p>
                <p className="rec-condition">{product.condition}</p>
              </div>
              <p className="rec-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="rec-button">See More</button>
    </div>


{isLightboxOpen && (
  <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
    <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
      <button
        className="lightbox-arrow left"
        onClick={() =>
          setCurrentIndex(
            currentIndex === 0 ? product.gallery.length - 1 : currentIndex - 1
          )
        }
      >
        <FaChevronLeft size={15} color="white" />
      </button>

      <img
        src={product.gallery[currentIndex]}
        alt={`gallery-${currentIndex}`}
        className="lightbox-image"
      />

      <button
        className="lightbox-arrow right"
        onClick={() =>
          setCurrentIndex(
            currentIndex === product.gallery.length - 1 ? 0 : currentIndex + 1
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
