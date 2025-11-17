import React, { useState, useContext } from "react";
import "./Women.css";
import WomenImg from "../assets/Desktop - 59.png";
import { FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";

const Women = () => {
  const { products } = useContext(ProductContext);
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
      title: "Women's Clothing",
      sub: [
        "Dresses",
        "Tops & Blouses",
        "Skirts & Pants",
        "Jackets & Coats",
        "Sweaters & Hoodies",
        "Activewear",
      ],
    },
    { title: "Men's Clothing", sub: [] },
    { title: "Shoes", sub: [] },
    { title: "Accessories", sub: [] },
    { title: "Kids & Baby", sub: [] },
    { title: "Vintage", sub: [] },
  ];

  return (
    <>
      <section
        className="women-banner"
        style={{ backgroundImage: `url(${WomenImg})` }}
      >
        <div className="women-banner-content">
          <h1>Women's Collection</h1>
        </div>
      </section>

      <section className="women-top-picks">
        <div className="women-top-picks-header">
          <div className="women-top-picks-filters-row">
            <div className="women-top-picks-filters">
              <button className="women-filter-btn active">All</button>

              <div className="women-filter-dropdown">
                <button
                  className="women-filter-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Category{" "}
                  <span>
                    {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="women-filter-menu">
                    <input
                      type="text"
                      placeholder="Search"
                      className="women-filter-search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    {categoryOptions.map((cat) => {
                      const filteredSub = cat.sub.filter((s) =>
                        s.toLowerCase().includes(search.toLowerCase())
                      );

                      return (
                        <div key={cat.title} className="women-filter-category">
                          <div
                            className="women-filter-category-title"
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
                            <div className="women-filter-subcategories">
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

            <div className="women-sort-by-dropdown">
              <select>
                <option>Sort By</option>
              </select>
            </div>
          </div>
        </div>

        <div className="women-top-picks-path">
          <h2>Home / Women / All</h2>
          <p>{products.length} items</p>
        </div>

        <div className="women-top-picks-grid">
          {products.map((item) => (
            <div
              className="women-top-pick-card"
              key={item.id}
              onClick={() =>
                navigate(`/singleproduct/${item.id}`, { state: item })
              }
            >
              <div
                className="women-top-pick-image"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="women-top-pick-like">
                  <FaHeart color="black" size={14} />
                  <p>{item.likes}</p>
                </div>
              </div>
              <div className="women-top-pick-info">
                <div>
                  <h3>{item.name}</h3>
                  <p className="women-top-pick-condition">{item.condition}</p>
                </div>
                <p className="women-top-pick-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="women-top-picks-more">
          <button>See More</button>
        </div>
      </section>
    </>
  );
};

export default Women;
