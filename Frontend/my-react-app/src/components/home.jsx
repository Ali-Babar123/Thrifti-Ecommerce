import React, { useState, useContext } from "react";
import "./Home.css";
import BannerImg from "../assets/HeroSection.png"; // replace this with your own image
import { FaHeart } from "react-icons/fa";
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
import Shoe from '../assets/shoe.svg'
import { ProductContext } from "../ProductContext/ProductContext";
import { useNavigate } from "react-router-dom";

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
  const { products } = useContext(ProductContext); // ✅ use products from context
    const navigate = useNavigate(); // ✅ for navigation

   const [dropdownOpen, setDropdownOpen] = useState(false);
        const [search, setSearch] = useState("");
        const [openSections, setOpenSections] = useState({});
        const [selected, setSelected] = useState({});
      
        const toggleSection = (key) => {
          setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
        };
      
        const handleCheckbox = (key) => {
          setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
        };
      
        const categoryOptions = [
          {
            title: "Men's Clothing",
            sub: [
              "T-shirts & Shirts",
              "Jeans & Trousers",
              "Jackets & Coats",
              "Hoodies & Sweatshirts",
              "Activewear",
              "Swimwear",
            ],
          },
          { title: "Women's Clothing", sub: [] },
          { title: "Shoes", sub: [] },
          { title: "Accessories", sub: [] },
          { title: "Kids & Baby", sub: [] },
          { title: "Vintage", sub: [] },
        ];
        
  
  

  
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


   <section className="top-picks">
    <div className="top-picks-header">
      <div className="top-picks-filters">
        <button className="filter-btn active">All</button>
  
        {/* Dropdown */}
        <div className="filter-dropdown">
          <button className="filter-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
            Category{" "}
            <span>{dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
          </button>
  
          {dropdownOpen && (
            <div className="filter-menu">
              <input
                type="text"
                placeholder="Search"
                className="filter-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
  
              {categoryOptions.map((cat) => {
                const filteredSub = cat.sub.filter((s) =>
                  s.toLowerCase().includes(search.toLowerCase())
                );
  
                return (
                  <div key={cat.title} className="filter-category">
                    <div
                      className="filter-category-title"
                      onClick={() => toggleSection(cat.title)}
                      >
                      {cat.title}
                      <span>
                        {cat.sub.length > 0 ? (
                            openSections[cat.title] ? (
                                <FaChevronUp />
                              ) : (
                                  <FaChevronDown />
                          )
                        ) : (
                            <FaChevronDown style={{ opacity: 0.4 }} />
                          )}
                      </span>
                    </div>
  
                    {openSections[cat.title] && filteredSub.length > 0 && (
                        <div className="filter-subcategories">
                        {filteredSub.map((item) => (
                          <label key={item}>
                            <input
                              type="checkbox"
                              checked={!!selected[item]}
                              onChange={() => handleCheckbox(item)}
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
  
        <select><option>Price</option></select>
        <select><option>Size</option></select>
        <select><option>Sort By</option></select>
        
  
  
      </div>
    </div>
         <div className="top-picks-path">
    <h2>Home / Men / All</h2>
    <p>1200 items</p>
  </div>
  
  
    {/* Product Grid */}
    <div className="top-picks-grid">
      {products.map((item) => (
       <div
  className="top-pick-card"
  key={item.id}
  onClick={() => navigate(`/singleproduct/${item.id}`, { state: item })} // ✅ navigate like Men’s page
  style={{ cursor: "pointer" }}
>

          <div
            className="top-pick-image"
            
             style={{ 
    backgroundImage: `url(${item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150'})` 
  }}
          >
            <div className="top-pick-like">
              <FaHeart color="black" size={14} />
              <p>{item.likes}</p>
            </div>
          </div>
          <div className="top-pick-info">
            <div>
              <h3>{item.title}</h3>
              <p className="top-pick-condition">{item.size} - {item.condition}</p>
              
            </div>
            <p className="top-pick-price">${item.price}</p>
          </div>
        </div>
      ))}
    </div>
  
    <div className="top-picks-more">
      <button>See More</button>
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
    </>
  );
};

export default Home;
