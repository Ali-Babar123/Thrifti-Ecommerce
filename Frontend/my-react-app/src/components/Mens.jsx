// src/pages/Mens.jsx
import React, { useState, useContext } from "react";
import "./Mens.css";
import MenImg from "../assets/Desktop - 59.png";
import { FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext"; // ✅ import context

const Mens = () => {
  const { products } = useContext(ProductContext); // ✅ use products from context
  const navigate = useNavigate();

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
        className="mens-banner"
        style={{ backgroundImage: `url(${MenImg})` }}
      >
        <div className="mens-banner-content">
          <h1>Men's Collection</h1>
        </div>
      </section>

      <section className="top-picks">
        <div className="top-picks-header">
          <div className="top-picks-filters-row">
            <div className="top-picks-filters">
              <button className="filter-btn active">All</button>

              <div className="filter-dropdown">
                <button
                  className="filter-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Category{" "}
                  <span>
                    {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
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

              <select>
                <option>Price</option>
              </select>
              <select>
                <option>Size</option>
              </select>
              <select>
                <option>Condition</option>
              </select>
              <select>
                <option>Brand</option>
              </select>
              <select>
                <option>Color</option>
              </select>
              <select>
                <option>Pattern</option>
              </select>
              <select>
                <option>Material</option>
              </select>
            </div>

            <div className="sort-by-dropdown">
              <select>
                <option>Sort By</option>
              </select>
            </div>
          </div>
        </div>

        <div className="top-picks-path">
          <h2>Home / Men / All</h2>
          <p>{products.length} items</p>
        </div>

        {/* ✅ Product Grid */}
        <div className="top-picks-grid">
          {products.map((item) => (
            <div
              className="top-pick-card"
              key={item.id}
              onClick={() => navigate(`/singleproduct/${item.id}`, { state: item })}
            >
              <div
                className="top-pick-image"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="top-pick-like">
                  <FaHeart color="black" size={14} />
                  <p>{item.likes}</p>
                </div>
              </div>
              <div className="top-pick-info">
                <div>
                  <h3>{item.name}</h3>
                  <p className="top-pick-condition">{item.condition}</p>
                </div>
                <p className="top-pick-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="top-picks-more">
          <button>See More</button>
        </div>
      </section>
    </>
  );
};

export default Mens;
