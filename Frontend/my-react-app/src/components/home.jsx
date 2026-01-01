import React, { useState, useContext } from "react";
import "./Home.css";
import BannerImg from "../assets/HeroSection.png"; // replace this with your own image
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Shirt from '../assets/shirts.png'
import Women from '../assets/women.svg'
import child from '../assets/child.svg'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; 
import Electronics from '../assets/electronics.svg'
import Rings from '../assets/rings.svg'
import Shoes from '../assets/shoes.svg'
import Jacket from '../assets/jacket.svg'
import Jwellery from '../assets/jwellery.svg'
import WomenCloth from '../assets/WomenCloth.svg'
import LoginModal from "./LoginModal";
import Shoe from '../assets/shoe.svg'
import { ProductContext } from "../ProductContext/ProductContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";

const categories = [
  {
    id: "men",
    title: "Men",
    desc: "Essential Oversize T-Shirts",
    button: true,
    image: Shirt,
  },
  {
    id: "women",
    title: "Women",
    desc: "Essential T-Shirts",
    image: Women,
  },
  {
    id: "kids",
    title: "Kids",
    desc: "North Hand X BNDG",
    image: child,
  },
  {
    id: "electronics",
    title: "Electronics",
    desc: "North Hand X Balsamic",
    image: Electronics,
  },
  {
    id: "accessories",
    title: "Accessories",
    desc: "Essential Bucket Hat",
    image: Rings,
  },
  {
    id: "sports",
    title: "Sports",
    desc: "The North Hand Base Camp Slide III Ltd. X Adidas",
    image: Shoes,
  },
];



const Home = () => {
   const { 
    products, 
    visibleCount, 
    loadMoreProducts, 
    loadingMore,  
    likedProducts, 
    likesCount,
    toggleLike 
  } = useContext(ProductContext);

  const navigate = useNavigate();

  const {isLoggedIn} = useContext(AuthContext);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pendingLikeId, setPendingLikeId] = useState(null);

  const visibleProducts = products.slice(0, visibleCount);

 
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

};


  

  
  return (

    <>
    <section
      className="home-banner"
      style={{ backgroundImage: `url(${BannerImg})` }}
    >
      <div className="home-content">
        <h1>Buy &amp; Sell Pre-Loved Fashion &amp; More</h1>
        <p>Peer-to-peer marketplace where you can shop or list instantly</p>
        <button className="home-btn">
          Sell Now <FaArrowRight className="arrow-icon" />
        </button>


        <div className="slider-line-row">
      {/* First line - full white */}
      <div className="slider-line">
        <div className="slider-fill full" />
      </div>

      {/* Second line - dark only */}
      <div className="slider-line" />

      {/* Third line - dark only */}
      <div className="slider-line" />
    </div>
      </div>
   
      
    </section>


<section className="home-featured__section">
  <div className="home-featured__header">
    <h2>Featured Categories</h2>
    <a href="#" className="home-featured__view-all">View All</a>
  </div>

  <div className="home-featured__grid">
    {categories.map((cat) => (
      <div
        key={cat.id}
        className={`home-featured__card ${cat.id}`}
        style={{ backgroundImage: `url(${cat.image})` }}
      >
        <div className="home-featured__overlay">
          <div className="home-featured__text-content">
            <div className="home-featured__text-left">
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>
            {cat.button && (
              <button className="home-featured__shop-btn">
                SHOP NOW <span>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


   {/* Top Picks */}
  <section className="top-picks">
  <div className="top-picks-grid">
    {visibleProducts.map((item) => (
      <div
        className="top-pick-card"
        key={item._id}
        onClick={() =>
          navigate(`/singleproduct/${item._id}`, { state: item })
        }
        style={{ cursor: "pointer" }}
      >
        <div
          className="top-pick-image"
          style={{
            backgroundImage: `url(${item.images?.[0] || "https://via.placeholder.com/150"})`,
          }}
        >
          <div
            className="top-pick-like"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleLike(item._id);
            }}
          >
            {likedProducts?.[item._id] ? (
              <FaHeart size={17} color="black" />
            ) : (
              <FaRegHeart size={17} color="gray" />
            )}

            <span className="like-count">
              {likesCount?.[item._id] ?? item.likes?.length ?? 0}
            </span>
          </div>
        </div>

        <div className="top-pick-info">
          <div>
            <h3>{item.title}</h3>
            <p className="top-pick-condition">
              {item.size} - {item.condition}
            </p>
          </div>
          <p className="top-pick-price">${item.price}</p>
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
</section>



      
<section className="section-four">
 <div className="wardrobe-section">
      <div className="wardrobe-overlay">
        <div className="wardrobe-content">
          <h1>Make Your Wardrobe Digital</h1>
          <p>
            Enjoy the convenience of having your wardrobe at your fingertips and
            effortlessly elevate your style.
          </p>
          <button className="seller-btn">
            Become a Seller <span className="arrow"><FaArrowRight /></span>
          </button>
        </div>
      </div>
    </div>

    </section>

     <LoginModal
      isOpen={authModalOpen}
      onClose={() => setAuthModalOpen(false)}
      onLoginSuccess={handleLoginSuccess}
    />
    </>
  );
};

export default Home;
