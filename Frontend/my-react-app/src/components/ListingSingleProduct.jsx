import React, { useState } from "react";
import "./ListingSingleProduct.css";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Link, X } from "lucide-react";
import DummyImage from "../assets/shirtofmen.svg"; // replace with your own
import DeleteItemPopup from "./DeleteItemPopup";

function ListingSingleProductPage() {
  const dummyGallery = [DummyImage, DummyImage, DummyImage, DummyImage];
  const [mainImage, setMainImage] = useState(dummyGallery[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false); 


  const [showBumpModal, setShowBumpModal] = useState(false);
  const navigate = useNavigate();


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
              {dummyGallery.map((img, index) => (
                <img
                  key={index}
                  src={DummyImage}
                  alt={`thumb-${index}`}
                  className={`thumbnail ${
                    DummyImage === img ? "active-thumbnail" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>

            <div className="main-image" onClick={() => setIsLightboxOpen(true)}>
              <img src={mainImage} alt="main" />
              <div className="likes">
                <Heart size={14} /> 120
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="details-section">
            <div className="check-progress" >
              <button className="buy-btn" style={{width: '100%', marginBottom: '15px'}}>Check in Progress</button>
              </div>
            <h2>Classic Black Jacket</h2>
            <p className="subtext">Gently Used</p>

            <div className="price">
              <span className="old-price">$70.00</span>
              <span className="new-price">$49.99</span>
            </div>

            <p className="buyer-protection">Includes Buyer Protection</p>
            <button className="discount-btn">🚚 Upto -100% postage</button>

            <div className="product-info">
              <p><strong>Brand:</strong> Zara</p>
              <p><strong>Size:</strong> M</p>
              <p><strong>Condition:</strong> Good</p>
              <p><strong>Color:</strong> Black</p>
              <p><strong>Uploaded:</strong> 15 hours ago</p>
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
          <h2>Member's items (4)</h2>

          <div className="bundle-actions">
            <div className="left-actions">
              <p className="shop-btn">Shop Bundles</p>
              <p className="save-text">Save on Postage</p>
            </div>
            <button className="create-btn">Create Bundles</button>
          </div>

          <div className="items-grid">
            {dummyGallery.slice(0, 2).map((img, index) => (
              <div className="item-card" key={index}>
                <img src={img} alt={`gallery-${index}`} />
                <div className="product-content">
                  <div className="name-des">
                    <p className="item-title">Classic Jacket</p>
                    <p className="item-condition">Used - Good</p>
                  </div>
                  <p className="item-price">$49.99</p>
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
              <img src={DummyImage} alt="seller" className="seller-img" />
              <div>
                <p className="seller-name">@fashionstore</p>
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
              src={dummyGallery[currentIndex]}
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

    </>
  );
}

export default ListingSingleProductPage;
