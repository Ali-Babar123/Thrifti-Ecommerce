import React, { useState, useContext } from "react";
import "./Sports.css";
import SportsImg from "../assets/Desktop - 59.png"; // replace with sports banner if different
import { FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";

const Sports = () => {
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
      title: "Sports Equipment",
      sub: [
        "Football",
        "Basketball",
        "Tennis",
        "Cricket",
        "Cycling",
        "Gym Equipment",
      ],
    },
    { title: "Sportswear", sub: [] },
    { title: "Shoes", sub: [] },
    { title: "Accessories", sub: [] },
    { title: "Outdoor Gear", sub: [] },
  ];

  return (
    <>
      <section
        className="sports-banner"
        style={{ backgroundImage: `url(${SportsImg})` }}
      >
        <div className="sports-banner-content">
          <h1>Sports</h1>
        </div>
      </section>

      <section className="sports-top-picks">
        <div className="sports-top-picks-header">
          <div className="sports-top-picks-filters-row">
            <div className="sports-top-picks-filters">
              <button className="sports-filter-btn active">All</button>

              <div className="sports-filter-dropdown">
                <button
                  className="sports-filter-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Category{" "}
                  <span>
                    {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="sports-filter-menu">
                    <input
                      type="text"
                      placeholder="Search"
                      className="sports-filter-search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    {categoryOptions.map((cat) => {
                      const filteredSub = cat.sub.filter((s) =>
                        s.toLowerCase().includes(search.toLowerCase())
                      );

                      return (
                        <div key={cat.title} className="sports-filter-category">
                          <div
                            className="sports-filter-category-title"
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
                            <div className="sports-filter-subcategories">
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

            <div className="sports-sort-by-dropdown">
              <select>
                <option>Sort By</option>
              </select>
            </div>
          </div>
        </div>

        <div className="sports-top-picks-path">
          <h2>Home / Sports / All</h2>
          <p>{products.length} items</p>
        </div>

        <div className="sports-top-picks-grid">
          {products.map((item) => (
            <div
              className="sports-top-pick-card"
              key={item.id}
              onClick={() =>
                navigate(`/singleproduct/${item.id}`, { state: item })
              }
            >
              <div
                className="sports-top-pick-image"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="sports-top-pick-like">
                  <FaHeart color="black" size={14} />
                  <p>{item.likes}</p>
                </div>
              </div>
              <div className="sports-top-pick-info">
                <div>
                  <h3>{item.name}</h3>
                  <p className="sports-top-pick-condition">{item.condition}</p>
                </div>
                <p className="sports-top-pick-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sports-top-picks-more">
          <button>See More</button>
        </div>
      </section>
    </>
  );
};

export default Sports;
