import React, { useState, useEffect, useContext, useRef } from "react";
import "./Women.css";
import WomenImg from "../assets/Desktop - 59.png";
import { useParams } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import { FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import { ChevronDown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";

const Women = () => {
  const { parent, main, sub } = useParams(); // Get URL params
  const { products, filterByCategory, filtered, visibleCount,loadMoreProducts,loadingMore } = useContext(ProductContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState({});
  const [selected, setSelected] = useState({});


      const  [selectedBrand, setSelectedBrand] = useState([]);
      const [selectedPrice, setSelectedPrice] = useState([]);
      const [selectedCondition, setSelectedCondition] = useState([]);
      const [selectedColors, setSelectedColors] = useState([]);
      const [selectedMaterials, setSelectedMaterials] = useState([]);
      const [selectedSizes, setSelectedSizes] = useState([]);
      const [selectedSort, setSelectedSort] = useState([]);

   
    useEffect(() => {
     if (products.length === 0) return;
   
     let filterParams = { parent: parent || "women" }; // URL param parent
   
     if (main) filterParams.main = main;
     if (sub) filterParams.sub = sub;
   
     // Merge dropdown-selected category if exists
     if (selectedCategory) {
       filterParams = {
         ...filterParams,
         ...selectedCategory
       };
     }
   
     filterByCategory(filterParams);
   }, [products, parent, main, sub, selectedCategory]);
   
   
     
   const displayProductsList = filtered.length > 0
     ? filtered
     : products.filter(p => p.category?.parent?.toLowerCase() === "women");
   
   const visibleProducts = displayProductsList.slice(0, visibleCount);


   const filteredByDropdown = displayProductsList.filter((item) => {
  const brandMatch = selectedBrand.length === 0 || selectedBrand.includes(item.brand);
  const conditionMatch = selectedCondition.length === 0 || selectedCondition.includes(item.condition);
  const colorMatch = selectedColors.length === 0 || selectedColors.some(c => item.color?.includes(c));
  const materialMatch = selectedMaterials.length === 0 || selectedMaterials.some(m => item.material?.includes(m));
  const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(item.size);

  return brandMatch && conditionMatch && colorMatch && materialMatch && sizeMatch;
});


  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckbox = (key) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };



  // Options
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
              

              
              <div className="all-dropdown-row">


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

           
          
          </div>
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
        </div>

        <div className="women-top-picks-path">
          <h2>Home / Women / All</h2>
          <p>{visibleProducts.length} items</p>
        </div>

        <div className="women-top-picks-grid">
          {visibleProducts.map((item) => (
            <div
              className="women-top-pick-card"
              key={item._id}
              onClick={() =>
                navigate(`/singleproduct/${item._id}`, { state: item })
              }
            >
              <div
                className="women-top-pick-image"
                   style={{ 
    backgroundImage: `url(${item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150'})` }}
              >
                <div className="women-top-pick-like">
                  <FaHeart color="black" size={14} />
                  <p>{item.likes}</p>
                </div>
              </div>
              <div className="women-top-pick-info">
                <div>
                  <h3>{item.title}</h3>
                  <p className="women-top-pick-condition">{item.size} - {item.condition}</p>
                </div>
                <p className="women-top-pick-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="women-top-picks-more">
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


const MultiSelectDropdown = ({ label, options, selected, setSelected, singleSelect = false, maxSelect }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const handleToggle = (option) => {
    if (singleSelect) {
      setSelected([option]);
      setOpen(false);
      return;
    }

    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
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
      ? options.filter((option) =>
          option.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

  const colorMap = {
    Black: "#000000",
    White: "#ffffff",
    Red: "#ff0000",
    Blue: "#0000ff",
    Green: "#008000",
    Yellow: "#ffff00",
    Gray: "#808080",
    Brown: "#8b4513",
    Purple: "#800080",
    Pink: "#ffc0cb",
    Orange: "#ffa500",
    Beige: "#f5f5dc",
    Cream: "#fffdd0",
    Burgundy: "#800020",
    Navy: "#000080",
    Olive: "#808000",
    Teal: "#008080",
    Maroon: "#800000",
    Gold: "#ffd700",
    Silver: "#c0c0c0",
    Coral: "#ff7f50",
    Mint: "#98ff98",
    Lavender: "#e6e6fa",
    Charcoal: "#36454f",
  };

  return (
    <div className="msd-container" ref={dropdownRef} style={{ position: "relative" }}>
      {/* Dropdown header */}
      <div className="msd-wrapper" onClick={() => setOpen(!open)}>
        <div className="msd-display">
  {capitalize(label)} {/* Always show label, ignore selected here */}
  <ChevronDown size={18} className={`msd-arrow ${open ? "open" : ""}`} />
</div>

      </div>

      {/* Dropdown menu */}
      {open && (
        <div className="msd-menu">
          {/* Search row for Brand only */}
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

          {/* Options list */}
         {label === "Price" ? (
  <div className="price-range-row" onClick={(e) => e.stopPropagation()}>
    
    {/* Min Price */}
    <div className="price-box">
      <label className="price-label">From</label>
      <input
        type="number"
        className="price-input-field"
        value={selected[0] || ""}
        onChange={(e) => {
          const updated = [e.target.value, selected[1] || ""];
          setSelected(updated);
        }}
      />
    </div>

    {/* Max Price */}
    <div className="price-box">
      <label className="price-label">To</label>
      <input
        type="number"
        className="price-input-field"
        value={selected[1] || ""}
        onChange={(e) => {
          const updated = [selected[0] || "", e.target.value];
          setSelected(updated);
        }}
      />
    </div>

  </div>
) : (
  filteredOptions.map((option) => (
    <div
      key={option}
      className="msd-option"
      onClick={(e) => { e.stopPropagation(); handleToggle(option); }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {label === "Color" && (
          <span
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: colorMap[option] || "#ccc",
              border: "1px solid #aaa"
            }}
          ></span>
        )}
        {option}
      </span>
      <div className={`msd-checkbox ${selected.includes(option) ? "msd-checked" : ""}`} />
    </div>
  ))
)}

        </div>
      )}
    </div>
  );
};
export default Women;
