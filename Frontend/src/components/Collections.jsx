import React, { useState, useContext } from "react";
import "./Collections.css";
import CollectionsImg from "../assets/latestcollection.png"; // replace with collections banner if different
import { FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";

const Collections = () => {
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
      title: "Collections",
      sub: [
        "Summer Collection",
        "Winter Collection",
        "Festive Collection",
        "Casual Collection",
        "Formal Collection",
      ],
    },
    { title: "Shoes", sub: [] },
    { title: "Accessories", sub: [] },
    { title: "Kids", sub: [] },
    { title: "Vintage", sub: [] },
  ];

  return (
    <>
      <section
        className="collections-banner"
        style={{ backgroundImage: `url(${CollectionsImg})` }}
      >
        <div className="collections-banner-content">
          <h1>Collections</h1>
        </div>
      </section>

      <section className="collections-top-picks">
        <div className="collections-top-picks-header">
          <div className="collections-top-picks-filters-row">
            <div className="collections-top-picks-filters">
              <button className="collections-filter-btn active">All</button>

              <div className="collections-filter-dropdown">
                <button
                  className="collections-filter-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Category{" "}
                  <span>
                    {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="collections-filter-menu">
                    <input
                      type="text"
                      placeholder="Search"
                      className="collections-filter-search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    {categoryOptions.map((cat) => {
                      const filteredSub = cat.sub.filter((s) =>
                        s.toLowerCase().includes(search.toLowerCase())
                      );

                      return (
                        <div key={cat.title} className="collections-filter-category">
                          <div
                            className="collections-filter-category-title"
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
                            <div className="collections-filter-subcategories">
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

            <div className="collections-sort-by-dropdown">
              <select>
                <option>Sort By</option>
              </select>
            </div>
          </div>
        </div>

        <div className="collections-top-picks-path">
          <h2>Home / Collections / All</h2>
          <p>{products.length} items</p>
        </div>

        <div className="collections-top-picks-grid">
          {products.map((item) => (
            <div
              className="collections-top-pick-card"
              key={item.id}
              onClick={() =>
                navigate(`/singleproduct/${item.id}`, { state: item })
              }
            >
              <div
                className="collections-top-pick-image"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="collections-top-pick-like">
                  <FaHeart color="black" size={14} />
                  <p>{item.likes}</p>
                </div>
              </div>
              <div className="collections-top-pick-info">
                <div>
                  <h3>{item.name}</h3>
                  <p className="collections-top-pick-condition">{item.condition}</p>
                </div>
                <p className="collections-top-pick-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="collections-top-picks-more">
          <button>See More</button>
        </div>
      </section>
    </>
  );
};

export default Collections;
