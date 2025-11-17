import React, { useState, useContext } from "react";
import "./OurPlateform.css";
import PlatformImg from "../assets/Desktop - 59.png"; // Replace with your actual platform banner
import { FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";

const OurPlatform = () => {
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
      title: "Platform Services",
      sub: [
        "Subscriptions",
        "Premium Features",
        "Analytics",
        "Integrations",
      ],
    },
    { title: "Tools", sub: [] },
    { title: "Support", sub: [] },
    { title: "Resources", sub: [] },
    { title: "Updates", sub: [] },
  ];

  return (
    <>
      <section
        className="platform-banner"
        style={{ backgroundImage: `url(${PlatformImg})` }}
      >
        <div className="platform-banner-content">
          <h1>Our Platform</h1>
        </div>
      </section>

      <section className="platform-top-picks">
        <div className="platform-top-picks-header">
          <div className="platform-top-picks-filters-row">
            <div className="platform-top-picks-filters">
              <button className="platform-filter-btn active">All</button>

              <div className="platform-filter-dropdown">
                <button
                  className="platform-filter-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Category{" "}
                  <span>
                    {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="platform-filter-menu">
                    <input
                      type="text"
                      placeholder="Search"
                      className="platform-filter-search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    {categoryOptions.map((cat) => {
                      const filteredSub = cat.sub.filter((s) =>
                        s.toLowerCase().includes(search.toLowerCase())
                      );

                      return (
                        <div key={cat.title} className="platform-filter-category">
                          <div
                            className="platform-filter-category-title"
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
                            <div className="platform-filter-subcategories">
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

            <div className="platform-sort-by-dropdown">
              <select>
                <option>Sort By</option>
              </select>
            </div>
          </div>
        </div>

        <div className="platform-top-picks-path">
          <h2>Home / Our Platform / All</h2>
          <p>{products.length} items</p>
        </div>

        <div className="platform-top-picks-grid">
          {products.map((item) => (
            <div
              className="platform-top-pick-card"
              key={item.id}
              onClick={() =>
                navigate(`/singleproduct/${item.id}`, { state: item })
              }
            >
              <div
                className="platform-top-pick-image"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="platform-top-pick-like">
                  <FaHeart color="black" size={14} />
                  <p>{item.likes}</p>
                </div>
              </div>
              <div className="platform-top-pick-info">
                <div>
                  <h3>{item.name}</h3>
                  <p className="platform-top-pick-condition">{item.condition}</p>
                </div>
                <p className="platform-top-pick-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="platform-top-picks-more">
          <button>See More</button>
        </div>
      </section>
    </>
  );
};

export default OurPlatform;
