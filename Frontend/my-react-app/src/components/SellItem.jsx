import React, { useState, useRef, useContext, useEffect } from "react";
import "./SellItem.css";
import { UploadCloud, Camera, Plus, X, ChevronDown } from "lucide-react";
import CategoryDropdown from "./CategoryDropdown";
import API from "../api/api";
import { ProductContext } from "../ProductContext/ProductContext";

const SellItem = () => {
  const { addProduct } = useContext(ProductContext);

  const [images, setImages] = useState([]); // Store File objects
  const [imagePreviews, setImagePreviews] = useState([]); // Store preview URLs
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState("5kg");

  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const parcelSizes = ["5kg", "10kg", "15kg"];

  // Dummy user for now (replace with your auth context later)
  const currentUser = { _id: "1234567890" };

  // Handle files
  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    setImages((prev) => [...prev, ...fileArray]);
    setImagePreviews((prev) => [
      ...prev,
      ...fileArray.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleFileChange = (e) => handleFiles(e.target.files);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || !description || !price || !selectedCategory) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      images.forEach((file) => formData.append("images", file));

      formData.append("userId", currentUser._id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", selectedCategory);
      formData.append("brand", selectedBrand[0] || "");
      formData.append("condition", selectedCondition[0] || "");
      formData.append("colors", JSON.stringify(selectedColors));
      formData.append("materials", JSON.stringify(selectedMaterials));
      formData.append("size", selectedSizes[0] || "");
      formData.append("price", price);
      formData.append("parcelSize", selectedSize);

      const res = await API.post("/api/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product uploaded successfully!");
      addProduct(res.data.data);

      // Reset form
      setImages([]);
      setImagePreviews([]);
      setTitle("");
      setDescription("");
      setSelectedCategory(null);
      setSelectedBrand([]);
      setSelectedCondition([]);
      setSelectedColors([]);
      setSelectedMaterials([]);
      setSelectedSizes([]);
      setPrice("");
      setSelectedSize(parcelSizes[0]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  return () => {
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
  };
}, [imagePreviews]);


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


  



  return (
    <div className="sell-container">
      <div className="breadcrumb">
        <p>Home / Sell Now</p>
      </div>

      <h2 className="sell-title">Sell an Item</h2>

      {/* Upload Area */}
      {images.length === 0 ? (
        <div
          className={`upload-box ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-inner">
            <UploadCloud className="upload-icon" />
            <p className="drag-text">Drag and drop or browse</p>
            <span className="or-text">or</span>
            <button
              type="button"
              className="choose-btn"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Choose Photo
            </button>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      ) : (
        <div className="image-list">
         {imagePreviews.map((preview, index) => (
  <div key={index} className="image-item">
    <img src={preview} alt={`upload-${index}`} className="image-preview" />
    <X className="remove-icon" onClick={() => removeImage(index)} />
  </div>
))}


          <div
            className="add-image"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <Plus
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                padding: "12px",
              }}
              size={50}
            />
          </div>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Quality Info */}
      <div className="quality-box">
        <Camera className="camera-icon" />
        <p>
          Catch Your Buyers’ Eye — Use Quality Photos.{" "}
          <a href="#">Learn More</a>
        </p>
      </div>

      {/* Form */}
      <form className="sell-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="form-row">
          <div className="form-group">
            <label>Title</label>
            <input type="text" placeholder="Tell Buyer’s what you are selling" value={title}
            onChange={(e) => setTitle(e.target.value)}/>
          </div>

          <div className="form-group">
            <label>Describe your item</label>
            <input type="text" placeholder="Tell Buyer’s more about it" 
            value={description}
  onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <CategoryDropdown onSelectCategory={(selected) => setSelectedCategory(selected)} />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input type="number" placeholder="€0.00" 
             value={price}
  onChange={(e) => setPrice(e.target.value)}/>
          </div>
        </div>

        {selectedCategory && selectedCategory.length > 0 && (
          <>
            <div className="form-row">
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
            </div>

            <div className="form-row">
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
            </div>

            <div className="form-row">
              <MultiSelectDropdown
                label="Size"
                options={sizes}
                selected={selectedSizes}
                setSelected={setSelectedSizes}
                singleSelect
              />
            </div>
          </>
        )}

        <div className="parcel-container">
          <label className="parcel-label">Select your Parcel Size</label>
          <div className="parcel-options">
            {parcelSizes.map((size) => (
              <div
                key={size}
                className={`parcel-option ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                <span className="parcel-text">{size}</span>
                <span className={`parcel-radio ${selectedSize === size ? "checked" : ""}`}></span>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group full-width">
          <label>What do you think of our upload process?</label>
          <textarea placeholder="Give Feedback"></textarea>
        </div>

        <div className="button-group">
          <button type="button" className="save-draft">Save Draft</button>
          <button type="submit" className="upload-btn">{loading ? "Uploading..." : "Upload"}</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

/* ✅ Fixed MultiSelectDropdown */
const MultiSelectDropdown = ({ label, options, selected, setSelected, singleSelect = false, maxSelect }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const handleToggle = (option) => {
    if (singleSelect) {
      setSelected([option]);
      setSearchTerm(option); // ✅ show selected brand name in input
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
    <div className="form-group multi-select" ref={dropdownRef} style={{ position: "relative" }}>
      <label>{label}</label>
      <div className="dropdown-wrapper" onClick={() => setOpen(!open)}>
        <div className="dropdown-display">
          {label === "Brand" ? (
            <input
              type="text"
              placeholder="Search brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
              className="brand-input-fix"
            />
          ) : (
            <>
              {selected.length > 0
                ? selected.join(", ")
                : `Select ${label.toLowerCase()}`}
              <ChevronDown size={18} />
            </>
          )}
        </div>
      </div>

      {open && (
        <div className="dropdown-menu">
          {filteredOptions.map((option) => (
            <div
              key={option}
              className="dropdown-option"
              onClick={(e) => {
                e.stopPropagation();
                handleToggle(option);
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {label === "Color" && (
                  <span
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      backgroundColor: colorMap[option] || "#ccc",
                      border: "1px solid #aaa",
                    }}
                  ></span>
                )}
                {option}
              </span>
              <div
                className={`custom-checkbox ${
                  selected.includes(option) ? "checked" : ""
                }`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellItem;
