import React, { useState, useContext, useEffect } from "react";
import "./Sports.css";
import { useParams } from "react-router-dom";
import SportsImg from "../assets/Desktop - 59.png"; // replace with sports banner if different
import { FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";

const Sports = () => {
  
    const { parent, main, sub } = useParams(); // Get URL params
      const { products, filterByCategory, filtered, visibleCount,loadMoreProducts,loadingMore } = useContext(ProductContext);
    
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState({});
  const [selected, setSelected] = useState({});

  useEffect(() => {
       console.log("Filtering:", { parent: "sports", main, sub });
     // Only call filter if products are loaded
   const filterParams = { parent: "sports" };
   
     if (main) filterParams.main = main;
     if (sub) filterParams.sub = sub;
   
     if (products.length > 0) {
       filterByCategory(filterParams);
     }
   }, [main, sub, products]);
 
   
 const displayProductsList = filtered.length > 0
   ? filtered
   : products.filter(p => p.category?.parent?.toLowerCase() === "sports");
 
 const visibleProducts = displayProductsList.slice(0, visibleCount);

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
          <p>{visibleProducts.length} items</p>
        </div>

        <div className="sports-top-picks-grid">
          {visibleProducts.map((item) => (
            <div
              className="sports-top-pick-card"
              key={item._id}
              onClick={() =>
                navigate(`/singleproduct/${item._id}`, { state: item })
              }
            >
              <div
                className="sports-top-pick-image"
                style={{ 
    backgroundImage: `url(${item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150'})` }}
              >
                <div className="sports-top-pick-like">
                  <FaHeart color="black" size={14} />
                  <p>{item.likes}</p>
                </div>
              </div>
              <div className="sports-top-pick-info">
                <div>
                  <h3>{item.title}</h3>
                  <p className="sports-top-pick-condition">{item.size} - {item.condition}</p>
                </div>
                <p className="sports-top-pick-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sports-top-picks-more">
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

export default Sports;
