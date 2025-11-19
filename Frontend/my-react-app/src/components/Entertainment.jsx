import React, { useState, useContext } from "react";
import "./Entertainment.css";
import EntertainmentImg from "../assets/Desktop - 59.png"; // replace with entertainment banner if different
import { FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";

const Entertainment = () => {
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
      title: "Movies & Series",
      sub: ["Action", "Comedy", "Drama", "Horror", "Documentary"],
    },
    {
      title: "Music & Instruments",
      sub: ["Guitar", "Piano", "Drums", "Microphones"],
    },
    { title: "Gaming", sub: ["Consoles", "PC Games", "Accessories"] },
    { title: "Books & Comics", sub: [] },
    { title: "Toys & Hobbies", sub: [] },
  ];

  return (
    <>
      <section
        className="entertainment-banner"
        style={{ backgroundImage: `url(${EntertainmentImg})` }}
      >
        <div className="entertainment-banner-content">
          <h1>Entertainment</h1>
        </div>
      </section>

      <section className="entertainment-top-picks">
        <div className="entertainment-top-picks-header">
          <div className="entertainment-top-picks-filters-row">
            <div className="entertainment-top-picks-filters">
              <button className="entertainment-filter-btn active">All</button>

              <div className="entertainment-filter-dropdown">
                <button
                  className="entertainment-filter-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Category{" "}
                  <span>
                    {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="entertainment-filter-menu">
                    <input
                      type="text"
                      placeholder="Search"
                      className="entertainment-filter-search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    {categoryOptions.map((cat) => {
                      const filteredSub = cat.sub.filter((s) =>
                        s.toLowerCase().includes(search.toLowerCase())
                      );

                      return (
                        <div
                          key={cat.title}
                          className="entertainment-filter-category"
                        >
                          <div
                            className="entertainment-filter-category-title"
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
                            <div className="entertainment-filter-subcategories">
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
                <option>Brand</option>
              </select>
              <select>
                <option>Condition</option>
              </select>
              <select>
                <option>Color</option>
              </select>
              <select>
                <option>Material</option>
              </select>
            </div>

            <div className="entertainment-sort-by-dropdown">
              <select>
                <option>Sort By</option>
              </select>
            </div>
          </div>
        </div>

        <div className="entertainment-top-picks-path">
          <h2>Home / Entertainment / All</h2>
          <p>{products.length} items</p>
        </div>

        <div className="entertainment-top-picks-grid">
          {products.map((item) => (
            <div
              className="entertainment-top-pick-card"
              key={item.id}
              onClick={() =>
                navigate(`/singleproduct/${item.id}`, { state: item })
              }
            >
              <div
                className="entertainment-top-pick-image"
               style={{ 
    backgroundImage: `url(${item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150'})` }}
              >
                <div className="entertainment-top-pick-like">
                  <FaHeart color="black" size={14} />
                  <p>{item.likes}</p>
                </div>
              </div>
              <div className="entertainment-top-pick-info">
                <div>
                  <h3>{item.title}</h3>
                  <p className="entertainment-top-pick-condition">
                   {item.size} - {item.condition}
                  </p>
                </div>
                <p className="entertainment-top-pick-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="entertainment-top-picks-more">
          <button>See More</button>
        </div>
      </section>
    </>
  );
};

export default Entertainment;
