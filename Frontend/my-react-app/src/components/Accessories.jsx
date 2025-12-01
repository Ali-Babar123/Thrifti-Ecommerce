import React, { useState, useContext, useEffect } from "react";
import "./Accessories.css";
import { useParams } from "react-router-dom";
import AccessoriesImg from "../assets/Desktop - 59.png"; // replace with accessories banner if different
import { FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";

const Accessories = () => {

  const { parent, main, sub } = useParams(); // Get URL params
  const navigate = useNavigate();
    const { products, filterByCategory, filtered, visibleCount,loadMoreProducts,loadingMore } = useContext(ProductContext);
  

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState({});
  const [selected, setSelected] = useState({});


  useEffect(() => {
           console.log("Filtering:", { parent: "accessories", main, sub });
         // Only call filter if products are loaded
       const filterParams = { parent: "accessories" };
       
         if (main) filterParams.main = main;
         if (sub) filterParams.sub = sub;
       
         if (products.length > 0) {
           filterByCategory(filterParams);
         }
       }, [main, sub, products]);
     
       
     const displayProductsList = filtered.length > 0
       ? filtered
       : products.filter(p => p.category?.parent?.toLowerCase() === "accessories");
     
     const visibleProducts = displayProductsList.slice(0, visibleCount);


   

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckbox = (key) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categoryOptions = [
    {
      title: "Accessories",
      sub: [
        "Bags & Wallets",
        "Belts",
        "Hats & Caps",
        "Jewelry",
        "Scarves & Gloves",
        "Sunglasses",
      ],
    },
    { title: "Shoes", sub: [] },
    { title: "Tech Accessories", sub: [] },
    { title: "Vintage", sub: [] },
  ];

  return (
    <>
      <section
        className="accessories-banner"
        style={{ backgroundImage: `url(${AccessoriesImg})` }}
      >
        <div className="accessories-banner-content">
          <h1>Accessories</h1>
        </div>
      </section>

      <section className="accessories-top-picks">
        <div className="accessories-top-picks-header">
          <div className="accessories-top-picks-filters-row">
            <div className="accessories-top-picks-filters">
              <button className="accessories-filter-btn active">All</button>

              <div className="accessories-filter-dropdown">
                <button
                  className="accessories-filter-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Category{" "}
                  <span>
                    {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="accessories-filter-menu">
                    <input
                      type="text"
                      placeholder="Search"
                      className="accessories-filter-search"
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
                          className="accessories-filter-category"
                        >
                          <div
                            className="accessories-filter-category-title"
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
                            <div className="accessories-filter-subcategories">
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

            <div className="accessories-sort-by-dropdown">
              <select>
                <option>Sort By</option>
              </select>
            </div>
          </div>
        </div>

        <div className="accessories-top-picks-path">
          <h2>Home / Accessories / All</h2>
          <p>{visibleProducts.length} items</p>
        </div>

        <div className="accessories-top-picks-grid">
          {visibleProducts.map((item) => (
            <div
              className="accessories-top-pick-card"
              key={item._id}
              onClick={() =>
                navigate(`/singleproduct/${item._id}`, { state: item })
              }
            >
              <div
                className="accessories-top-pick-image"
                style={{
                  backgroundImage: `url(${item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150'})` }}
              >
                <div className="accessories-top-pick-like">
                  <FaHeart color="black" size={14} />
                  <p>{item.likes}</p>
                </div>
              </div>
              <div className="accessories-top-pick-info">
                <div>
                  <h3>{item.title}</h3>
                  <p className="accessories-top-pick-condition">{item.size} - {item.condition}</p>
                </div>
                <p className="accessories-top-pick-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="accessories-top-picks-more">
              {loadingMore ? (
  <div className="circle-loader"></div>
) : (
  visibleProducts.length < displayProductsList.length && (
    <button onClick={loadMoreProducts}>See More</button>
  )
)}
        </div>
      </section>
    </>
  );
};

export default Accessories;
