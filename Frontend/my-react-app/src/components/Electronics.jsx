import React, { useState, useContext, useEffect, useRef } from "react";
import "./Electronics.css";
import { useParams } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import { Filter, Sliders } from "lucide-react";
import { FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import { ChevronDown, X, ChevronRight, ChevronLeft, CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";
import ElectronicsImg from "../assets/Desktop - 59.png"; // replace with electronics banner if different


const Electronics = () => {
  const navigate = useNavigate();
  const { products, applyFilters, filtered, visibleCount,loadMoreProducts,loadingMore } = useContext(ProductContext);

   
  const { parent, main, sub } = useParams(); // Get URL params
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState({});
  const [selected, setSelected] = useState({});
  const [mobileFilterTitle, setMobileFilterTitle] = useState("Filter");
   const [mobileFilterLevel, setMobileFilterLevel] = useState("main");
             const [isFilterOpen, setIsFilterOpen] = useState(false);
               const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  const [selectedCategory, setSelectedCategory] = useState([]);
  const  [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedSort, setSelectedSort] = useState([]);



   useEffect(() => {
           if (products.length === 0) return;
         
           // BUILD FILTER OBJECT TO SEND TO CONTEXT
           let filterParams = {
             parent: parent || "electronics",
             main,
             sub,
             brand: selectedBrand,
             condition: selectedCondition,
             colors: selectedColors,
             materials: selectedMaterials,
             sizes: selectedSizes,
             priceRange: selectedPrice,
             sort: selectedSort[0] || ""
           };
         
           // If CategoryFilter selected something
           if (selectedCategory.length > 0) {
             const cat = selectedCategory[0];
         
             filterParams.parent = cat.parent || filterParams.parent;
             filterParams.main = cat.main || filterParams.main;
             filterParams.sub = cat.sub || filterParams.sub;
           }
         
           applyFilters(filterParams);
         
         }, [
           products,
           parent,
           main,
           sub,
           selectedCategory,
           selectedBrand,
           selectedCondition,
           selectedColors,
           selectedMaterials,
           selectedSizes,
           selectedPrice,
           selectedSort
         ]);
         
         
         
         const displayProductsList = filtered;
       
         const visibleProducts = displayProductsList.slice(0, visibleCount);
   
   
      const filteredByDropdown = displayProductsList.filter((item) => {
     const brandMatch = selectedBrand.length === 0 || selectedBrand.includes(item.brand);
     const conditionMatch = selectedCondition.length === 0 || selectedCondition.includes(item.condition);
     const colorMatch = selectedColors.length === 0 || selectedColors.some(c => item.color?.includes(c));
     const materialMatch = selectedMaterials.length === 0 || selectedMaterials.some(m => item.material?.includes(m));
     const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(item.size);
   
     return brandMatch && conditionMatch && colorMatch && materialMatch && sizeMatch;
   });
  


  const filterCount =
      selectedCategory.length +
      selectedPrice.length +
      selectedBrand.length +
      selectedCondition.length +
      selectedColors.length +
      selectedMaterials.length +
      selectedSizes.length +
      (selectedSort ? 0 : 1);
    
      const clearAllFilters = () => {
        setSelectedCategory([]);
        setSelectedPrice([]);
        setSelectedBrand([]);
        setSelectedCondition([]);
        setSelectedColors([]);
        setSelectedMaterials([]);
        setSelectedSizes([]);
        setSelectedSort([]);
      };
    
    
    
      
    
    
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    
      const applyMobileFilters = () => {
      setIsFilterOpen(false);
    
      let filterParams = {
        parent: parent || "electronics",
        main,
        sub,
        brand: selectedBrand,
        condition: selectedCondition,
        colors: selectedColors,
        materials: selectedMaterials,
        sizes: selectedSizes,
        priceRange: selectedPrice,
        sort: selectedSort[0] || ""
      };
    
      if (selectedCategory.length > 0) {
        const cat = selectedCategory[0];
        filterParams.parent = cat.parent || filterParams.parent;
        filterParams.main = cat.main || filterParams.main;
        filterParams.sub = cat.sub || filterParams.sub;
      }
    
      applyFilters(filterParams);
    };
    

   const brands = [
    "Nike", "Next", "George", "Kaibi", "addidas", "PrettyLittleThing", "H&M", "Shein", "Stradivarius", "Mango", "Marks & Spencer",
    "Breshka", "Matalan", "Only", "Topshop", "River Island", "ASOS", "Atomosphere", "Adidas", "Puma", "Primark", "No Label",
    "Gucci", "Zara", "H&M", "Levi's", "F&F", "Camaieu", "Nutmeg", "Misguided", "C&A", "Papaya", "Pull & Bear", "Disney"
  ];
  const conditions = ["New with tags", "New without tags", "Very good", "Good", "Satisfactory"];
  const colors = [
    "Black", "White", "Red", "Blue", "Green", "Yellow", "Gray", "Brown",
    "Purple", "Pink", "Orange", "Beige", "Cream", "Burgundy", "Navy", "Olive",
    "Teal", "Maroon", "Gold", "Silver", "Coral", "Mint", "Lavender", "Charcoal"
  ];
  
  const materials = [
    "Acrylic", "Alpaca", "Bamboo", "Cardboard", "Cashmere", "Ceramic", "Chiffon", "Corduroy", "Cotton", "Denim", "Down",
    "Elastane", "Faz Faur", "Faux leather", "Felt", "Flannel", "Fleece", "Glass", "Gold", "Jute", "Lace", "Latex", "Leather",
    "Mohair", "Metal", "Mesh", "Merino", "Nylon", "Neoprene", "Polyester", "Porcelian", "Plastic", "Patent leather", "Paper",
    "Rattan", "Rubber", "Silk", "Satin", "Sequin", "Silicone", "Steel", "Stone", "Straw", "Suede", "Tweed", "Tulle", "Viscose",
    "Valvet", "Velour", "Wood", "Wool"
  ];
  const sizes = ["XXXS / 2", "XXX / 4", "XS / 6", "S /8", "M / 10", "L / 12", "XL / 14", "XXL / 16", "XXX / 16", "XXXL / 18", "4XL / 20", "5XL / 22", "6XL / 24", "7XL / 26", "8XL / 28", "9XL / 30", "One size", "Other"];
  
  const sort = ["Newest", "Oldest", "Price Low to High", "Price High to Low"];

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

              <div className="mobile-filter-btn" onClick={() => setIsFilterOpen(true)}>
                  <Sliders size={18} />
                  <span>Filter</span>
                  <span className="filter-count">{filterCount}</span>
                </div>

                  <div className="all-dropdown-row desktop-only">


 <CategoryFilter
  selectedCategories={selectedCategory}
  setSelectedCategories={setSelectedCategory}
  onSelectCategory={(selected) => {
    setSelectedCategory(Array.isArray(selected) ? selected : [selected]);
  }}
/>

  <MultiSelectDropdown
  label="Price"
  options={[]}     // 👈 EMPTY OPTIONS — stops dropdown options from showing
  selected={selectedPrice}
  setSelected={setSelectedPrice}
  isPriceRange     // 👈 custom flag for clarity (optional)
 />



  <MultiSelectDropdown
    label="Brand"
    options={brands}
    selected={selectedBrand}
    setSelected={setSelectedBrand}
    singleSelect
  />

  <MultiSelectDropdown
    label="Condition"
    options={conditions}
    selected={selectedCondition}
    setSelected={setSelectedCondition}
    singleSelect
  />

  <MultiSelectDropdown
    label="Color"
    options={colors}
    selected={selectedColors}
    setSelected={setSelectedColors}
    maxSelect={3}
  />

  <MultiSelectDropdown
    label="Material"
    options={materials}
    selected={selectedMaterials}
    setSelected={setSelectedMaterials}
    maxSelect={3}
  />

  <MultiSelectDropdown
    label="Size"
    options={sizes}
    selected={selectedSizes}
    setSelected={setSelectedSizes}
    singleSelect
  />

  <MultiSelectDropdown
    label="Sort By"
    options={sort}
    selected={selectedSort} // create separate state e.g., selectedSort
    setSelected={setSelectedSort} // change to setSelectedSort
    singleSelect
  />
  </div>


            </div>
              {isFilterOpen && isMobile && (
              <div className="mobile-filter-panel">

                {/* HEADER */}
                <div className="mobile-filter-header">
                  <span className="close-btn" onClick={() => setIsFilterOpen(false)}>✕</span>
                  <h3>Filter</h3>
                  <span className="clear-btn" onClick={clearAllFilters}>Clear All</span>
                </div>

                {/* BODY */}
                <div className="mobile-filter-body">

                  <CategoryFilter
                    selectedCategories={selectedCategory}
                    setSelectedCategories={setSelectedCategory}
                    
                    applyFilters={applyMobileFilters} // pass from Mens
                    onSelectCategory={(s) =>
                      setSelectedCategory(Array.isArray(s) ? s : [s])
                    }
                  />

                  <MultiSelectDropdown
                    label="Price"
                    options={[]}
                    selected={selectedPrice}
                    setSelected={setSelectedPrice}
                    isMobile={isMobile}
                    setIsFilterOpen={setIsFilterOpen} // allow dropdown to close the panel

                    applyFilters={applyMobileFilters} // pass from Mens
                  />

                  <MultiSelectDropdown
                    label="Brand"
                    options={brands}
                    selected={selectedBrand}
                    setSelected={setSelectedBrand}
                    isMobile={isMobile}
                    setIsFilterOpen={setIsFilterOpen} // allow dropdown to close the panel

                   applyFilters={applyMobileFilters} // pass from Mens
                  />

                  <MultiSelectDropdown
                    label="Condition"
                    options={conditions}
                    selected={selectedCondition}
                    setSelected={setSelectedCondition}
                    isMobile={isMobile}
                    setIsFilterOpen={setIsFilterOpen} // allow dropdown to close the panel

                   applyFilters={applyMobileFilters} // pass from Mens
                  />

                  <MultiSelectDropdown
                    label="Color"
                    options={colors}
                    selected={selectedColors}
                    setSelected={setSelectedColors}
                    isMobile={isMobile}
                    setIsFilterOpen={setIsFilterOpen} // allow dropdown to close the panel

                    applyFilters={applyMobileFilters} // pass from Mens
                  />

                  <MultiSelectDropdown
                    label="Material"
                    options={materials}
                    selected={selectedMaterials}
                    setSelected={setSelectedMaterials}
                    isMobile={isMobile}
                    setIsFilterOpen={setIsFilterOpen} // allow dropdown to close the panel

                   applyFilters={applyMobileFilters} // pass from Mens
                  />

                  <MultiSelectDropdown
                    label="Size"
                    options={sizes}
                    selected={selectedSizes}
                    setSelected={setSelectedSizes}
                    isMobile={isMobile}
                    setIsFilterOpen={setIsFilterOpen} // allow dropdown to close the panel

                  applyFilters={applyMobileFilters} // pass from Mens
                  />

                  <MultiSelectDropdown
                    label="Sort By"
                    options={sort}
                    selected={selectedSort}
                    setSelected={setSelectedSort}
                    isMobile={isMobile}
                    setIsFilterOpen={setIsFilterOpen} // allow dropdown to close the panel
                    applyFilters={applyMobileFilters} // pass from Mens
                  />
                </div>

                {/* SHOW RESULTS BUTTON */}
                <button className="show-results-btn" onClick={applyMobileFilters}>
                  Show results
                </button>

              </div>
            )}

          </div>
            {!isMobile && (
                                         <div className="selected-tags">
                                       
                               {selectedCategory.map((item, idx) => (
                                 <div key={`category-${idx}`} className="selected-tag">
                                   {typeof item === "object"
                                     ? item.sub 
                                     : item
                                   }
                                   <X
                                     size={20}
                                     className="tag-close"
                                     onClick={() => setSelectedCategory(selectedCategory.filter(i => i !== item))}
                                   />
                                 </div>
                               ))}
                               
                               
                                 {selectedBrand.map((item, idx) => (
                                   <div key={`brand-${idx}`} className="selected-tag">
                                     {item}
                                     <X
                                       size={20}
                                       className="tag-close"
                                       onClick={() => setSelectedBrand(selectedBrand.filter(i => i !== item))}
                                     />
                                   </div>
                                 ))}
                               
                                 {selectedColors.map((item, idx) => (
                                   <div key={`color-${idx}`} className="selected-tag">
                                     {item}
                                     <X
                                       size={20}
                                       className="tag-close"
                                       onClick={() => setSelectedColors(selectedColors.filter(i => i !== item))}
                                     />
                                   </div>
                                 ))}
                               
                                 {selectedMaterials.map((item, idx) => (
                                   <div key={`material-${idx}`} className="selected-tag">
                                     {item}
                                     <X
                                       size={20}
                                       className="tag-close"
                                       onClick={() => setSelectedMaterials(selectedMaterials.filter(i => i !== item))}
                                     />
                                   </div>
                                 ))}
                               
                                 {selectedSizes.map((item, idx) => (
                                   <div key={`size-${idx}`} className="selected-tag">
                                     {item}
                                     <X
                                       size={20}
                                       className="tag-close"
                                       onClick={() => setSelectedSizes(selectedSizes.filter(i => i !== item))}
                                     />
                                   </div>
                                 ))}
                               
                                 
                               
                                 {selectedCondition.map((item, idx) => (
                                   <div key={`condition-${idx}`} className="selected-tag">
                                     {item}
                                     <X
                                       size={20}
                                       className="tag-close"
                                       onClick={() => setSelectedCondition(selectedCondition.filter(i => i !== item))}
                                     />
                                   </div>
                                 ))}
                               
                                 {selectedSort.map((item, idx) => (
                                 <div key={`sort-${idx}`} className="selected-tag">
                                   {item}
                                   <X
                                     size={20}
                                     className="tag-close"
                                     onClick={() => setSelectedSort(selectedSort.filter(i => i !== item))}
                                   />
                                 </div>
                               ))}
                               {/* FROM Price Tag */}
                               {selectedPrice[0] && (
                                 <div className="selected-tag">
                                   From £{selectedPrice[0]}
                                   <X
                                     size={20}
                                     className="tag-close"
                                     onClick={() => setSelectedPrice(["", selectedPrice[1] || ""])}
                                   />
                                 </div>
                               )}
                               
                               {/* TO Price Tag */}
                               {selectedPrice[1] && (
                                 <div className="selected-tag">
                                   To £{selectedPrice[1]}
                                   <X
                                     size={20}
                                     className="tag-close"
                                     onClick={() => setSelectedPrice([selectedPrice[0] || "", ""])}
                                   />
                                 </div>
                               )}
                               
                               
                               
                                
                               
                               
                               
                               
                               
                               
                               </div>
                                       )}

                   
        </div>

        <div className="electronics-top-picks-path">
          <h2>Home / Electronics / All</h2>
          <p>{visibleProducts.length} items</p>
        </div>

        <div className="electronics-top-picks-grid">
          {visibleProducts.map((item) => (
            <div
              className="electronics-top-pick-card"
              key={item._id}
              onClick={() =>
                navigate(`/singleproduct/${item._id}`, { state: item })
              }
            >
              <div
                className="electronics-top-pick-image"
                style={{ 
    backgroundImage: `url(${item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150'})` }}
              >
                <div className="electronics-top-pick-like">
                  <FaHeart color="black" size={14} />
                  <p>{item.likes}</p>
                </div>
              </div>
              <div className="electronics-top-pick-info">
                <div>
                  <h3>{item.title}</h3>
                  <p className="electronics-top-pick-condition">{item.size} - {item.condition}</p>
                </div>
                <p className="electronics-top-pick-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="electronics-top-picks-more">
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


const capitalize = (str) => {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};


const MultiSelectDropdown = ({
  label,
  options,
  selected,
  setSelected,
  singleSelect = false,
  maxSelect,
  isMobile,
  applyFilters,
  setIsFilterOpen
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const [level, setLevel] = useState("main");
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleToggle = (option) => {
    if (singleSelect) {
      setSelected([option]);
      return;
    }

    if (selected.includes(option)) {
      setSelected(selected.filter((i) => i !== option));
    } else if (!maxSelect || selected.length < maxSelect) {
      setSelected([...selected, option]);
    }
  };




  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions =
    label === "Brand"
      ? options.filter((o) =>
        o.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : options;

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);


  

const handleShowResults = () => {
  if (applyFilters) applyFilters(); // apply filters passed from parent
  if (setIsFilterOpen) setIsFilterOpen(false); // close the mobile filter panel
  setOpen(false); // close the dropdown itself
  setLevel("main"); // reset level
  setSelectedFilter(null); // reset selected filter
};



  return (
    <div className="msd-container" ref={dropdownRef}>
      {/* HEADER */}
      <div
        className="msd-wrapper"
        onClick={() => {
          if (isMobile) {
            setSelectedFilter(label);
            setLevel("sub");
            setIsFilterOpen(true);
          } else {
            setOpen(!open);
          }
        }}
      >
        <div className="msd-display">
          {capitalize(label)}

          {isMobile ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronDown size={18} className={`msd-arrow ${open ? "open" : ""}`} />
          )}
        </div>
      </div>

      {/* ********************* */}
      {/* 📱 MOBILE SUB PANEL */}
      {/* ********************* */}
      {isMobile && level === "sub" && (
        <div className="msd-mobile-panel">
          <div className="msd-mobile-header">
            <span
              className="msd-back"
              onClick={() => {
                setLevel("main");
                setSelectedFilter(null);
              }}
            >
              <ChevronLeft size={20} />
            </span>

            <h3 style={{ margin: "auto", fontWeight: 600 }}>
              {capitalize(selectedFilter)}
            </h3>
          </div>

          {/* OPTIONS */}
          <div className="msd-mobile-options">
            {selectedFilter === "Price" ? (
              <div className="price-range-row">
                {/* Min Price */}
                <div className="price-box">
                  <label className="price-label">From</label>
                  <input
                    type="number"
                    className="price-input-field"
                    value={selected[0] || ""}
                    onChange={(e) =>
                      setSelected([e.target.value, selected[1] || ""])
                    }
                  />
                </div>

                {/* Max Price */}
                <div className="price-box">
                  <label className="price-label">To</label>
                  <input
                    type="number"
                    className="price-input-field"
                    value={selected[1] || ""}
                    onChange={(e) =>
                      setSelected([selected[0] || "", e.target.value])
                    }
                  />
                </div>
              </div>
            ) : (
              filteredOptions?.map((opt) => {
                const isSelected = selected.includes(opt);
                return (
                  <div
                    key={opt}
                    className="msd-mobile-option"
                    onClick={() => handleToggle(opt)}
                  >
                    <span>{opt}</span>
                    <div className={`msd-checkbox ${isSelected ? "msd-checked" : ""}`} />
                  </div>
                );
              })
            )}
          </div>

          <button
            className="msd-show-results-btn"
            onClick={handleShowResults}
          >
            Show results
          </button>
        </div>
      )}

      {/* ********************* */}
      {/* 🖥 DESKTOP DROPDOWN */}
      {/* ********************* */}
      {open && !isMobile && (
        <div className="msd-menu">
          {/* BRAND SEARCH */}
          {label === "Brand" && (
            <div style={{ padding: "5px 10px" }}>
              <input
                type="text"
                placeholder="Search Brand"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="msd-brand-input"
                autoFocus
              />
            </div>
          )}

          {/* OPTIONS */}
          {label === "Price" ? (
            <div className="price-range-row" onClick={(e) => e.stopPropagation()}>
              {/* Min Price */}
              <div className="price-box">
                <label className="price-label">From</label>
                <input
                  type="number"
                  className="price-input-field"
                  value={selected[0] || ""}
                  onChange={(e) =>
                    setSelected([e.target.value, selected[1] || ""])
                  }
                />
              </div>

              {/* Max Price */}
              <div className="price-box">
                <label className="price-label">To</label>
                <input
                  type="number"
                  className="price-input-field"
                  value={selected[1] || ""}
                  onChange={(e) =>
                    setSelected([selected[0] || "", e.target.value])
                  }
                />
              </div>
            </div>
          ) : (
            filteredOptions.map((opt) => {
              const isSelected = selected.includes(opt);
              return (
                <div
                  key={opt}
                  className="msd-option"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(opt);
                  }}
                >
                  <span>{opt}</span>
                  <div className={`msd-checkbox ${isSelected ? "msd-checked" : ""}`} />
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};


export default Electronics;
