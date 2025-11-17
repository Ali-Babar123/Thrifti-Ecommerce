import React, { useState, useContext } from "react";
import "./Electronics.css";
import ElectronicsImg from "../assets/Desktop - 59.png"; // replace with electronics banner if different
import { FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";

const Electronics = () => {
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
      title: "Electronics",
      sub: [
        "Laptops",
        "Smartphones",
        "Headphones",
        "Cameras",
        "Smartwatches",
        "Gaming Consoles",
      ],
    },
    { title: "Accessories", sub: [] },
    { title: "Wearables", sub: [] },
    { title: "Home Appliances", sub: [] },
    { title: "Vintage Electronics", sub: [] },
  ];

  return (
    <>
      <section
        className="electronics-banner"
        style={{ backgroundImage: `url(${ElectronicsImg})` }}
      >
        <div className="electronics-banner-content">
          <h1>Electronics</h1>
        </div>
      </section>

      <section className="electronics-top-picks">
        <div className="electronics-top-picks-header">
          <div className="electronics-top-picks-filters-row">
            <div className="electronics-top-picks-filters">
              <button className="electronics-filter-btn active">All</button>

              <div className="electronics-filter-dropdown">
                <button
                  className="electronics-filter-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Category{" "}
                  <span>
                    {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="electronics-filter-menu">
                    <input
                      type="text"
                      placeholder="Search"
                      className="electronics-filter-search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    {categoryOptions.map((cat) => {
                      const filteredSub = cat.sub.filter((s) =>
                        s.toLowerCase().includes(search.toLowerCase())
                      );

                      return (
                        <div key={cat.title} className="electronics-filter-category">
                          <div
                            className="electronics-filter-category-title"
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
                            <div className="electronics-filter-subcategories">
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
                <option>Features</option>
              </select>
            </div>

            <div className="electronics-sort-by-dropdown">
              <select>
                <option>Sort By</option>
              </select>
            </div>
          </div>
        </div>

        <div className="electronics-top-picks-path">
          <h2>Home / Electronics / All</h2>
          <p>{products.length} items</p>
        </div>

        <div className="electronics-top-picks-grid">
          {products.map((item) => (
            <div
              className="electronics-top-pick-card"
              key={item.id}
              onClick={() =>
                navigate(`/singleproduct/${item.id}`, { state: item })
              }
            >
              <div
                className="electronics-top-pick-image"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="electronics-top-pick-like">
                  <FaHeart color="black" size={14} />
                  <p>{item.likes}</p>
                </div>
              </div>
              <div className="electronics-top-pick-info">
                <div>
                  <h3>{item.name}</h3>
                  <p className="electronics-top-pick-condition">{item.condition}</p>
                </div>
                <p className="electronics-top-pick-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="electronics-top-picks-more">
          <button>See More</button>
        </div>
      </section>
    </>
  );
};

export default Electronics;
