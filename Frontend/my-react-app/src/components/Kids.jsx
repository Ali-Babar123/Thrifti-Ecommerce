import React, { useState, useContext } from "react";
import "./Kids.css";
import KidsImg from "../assets/KidsMain.png"; // replace with kids banner if different
import { FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";

const Kids = () => {
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
      title: "Kids Clothing",
      sub: [
        "T-shirts & Tops",
        "Pants & Shorts",
        "Dresses & Skirts",
        "Jackets & Coats",
        "Sweaters & Hoodies",
        "Activewear",
      ],
    },
    { title: "Shoes", sub: [] },
    { title: "Accessories", sub: [] },
    { title: "Baby Products", sub: [] },
    { title: "Toys", sub: [] },
    { title: "Vintage", sub: [] },
  ];

  return (
    <>
      <section
        className="kids-banner"
        style={{ backgroundImage: `url(${KidsImg})` }}
      >
        <div className="kids-banner-content">
          <h1>Kid's Collection</h1>
        </div>
      </section>

      <section className="kids-top-picks">
        <div className="kids-top-picks-header">
          <div className="kids-top-picks-filters-row">
            <div className="kids-top-picks-filters">
              <button className="kids-filter-btn active">All</button>

              <div className="kids-filter-dropdown">
                <button
                  className="kids-filter-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Category{" "}
                  <span>
                    {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="kids-filter-menu">
                    <input
                      type="text"
                      placeholder="Search"
                      className="kids-filter-search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    {categoryOptions.map((cat) => {
                      const filteredSub = cat.sub.filter((s) =>
                        s.toLowerCase().includes(search.toLowerCase())
                      );

                      return (
                        <div key={cat.title} className="kids-filter-category">
                          <div
                            className="kids-filter-category-title"
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
                            <div className="kids-filter-subcategories">
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

            <div className="kids-sort-by-dropdown">
              <select>
                <option>Sort By</option>
              </select>
            </div>
          </div>
        </div>

        <div className="kids-top-picks-path">
          <h2>Home / Kids / All</h2>
          <p>{products.length} items</p>
        </div>

        <div className="kids-top-picks-grid">
          {products.map((item) => (
            <div
              className="kids-top-pick-card"
              key={item.id}
              onClick={() =>
                navigate(`/singleproduct/${item.id}`, { state: item })
              }
            >
              <div
                className="kids-top-pick-image"
                style={{ 
    backgroundImage: `url(${item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150'})` }}
              >
                <div className="kids-top-pick-like">
                  <FaHeart color="black" size={14} />
                  <p>{item.likes}</p>
                </div>
              </div>
              <div className="kids-top-pick-info">
                <div>
                  <h3>{item.title}</h3>
                  <p className="kids-top-pick-condition">{item.size} - {item.condition}</p>
                </div>
                <p className="kids-top-pick-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="kids-top-picks-more">
          <button>See More</button>
        </div>
      </section>
    </>
  );
};

export default Kids;
