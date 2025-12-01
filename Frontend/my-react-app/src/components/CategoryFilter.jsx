import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import SelectorFilter from "./SelectorFilter";
import "./CategoryFilter.css";

const CategoryFilter = ({ onSelectCategory, selectedCategories, setSelectedCategories }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategories([...selectedCategories, category]);
    onSelectCategory(category);
    setOpen(false);
  };

  return (
    <div className="category-filter-container" ref={dropdownRef}>
      <div className="category-filter-display" onClick={() => setOpen(!open)}>
        <span>Category</span> {/* Always show label */}
        <ChevronDown size={20} className={`category-filter-arrow ${open ? "open" : ""}`} />
      </div>

      {open && (
        <div className="category-filter-panel">
          <SelectorFilter onSelectCategory={handleCategorySelect} />
        </div>
      )}


    </div>
  );
};

export default CategoryFilter;
