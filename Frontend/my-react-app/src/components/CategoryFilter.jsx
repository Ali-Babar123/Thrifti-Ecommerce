import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import SelectorFilter from "./SelectorFilter";
import "./CategoryFilter.css";

const CategoryFilter = ({ onSelectCategory, selectedCategories, applyFilters, setSelectedCategories }) => {
  const [mobileMode, setMobileMode] = useState(window.innerWidth <= 768);
  const filterRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // desktop dropdown open
  const [mobileOpen, setMobileOpen] = useState(false); // mobile fullscreen

  const [selectorLevel, setSelectorLevel] = useState("main");
  const [currentCategoryName, setCurrentCategoryName] = useState("");

  useEffect(() => {
    const handleResize = () => setMobileMode(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategories([category]);
    onSelectCategory(category);
  };

  useEffect(() => {
  function handleClickOutside(e) {
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setIsOpen(false); // close desktop dropdown
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

const applyMobileFilters = () => {
  if (selectedCategories.length > 0) {
    onSelectCategory(selectedCategories[0]); // or modify for multiple selections
  }
};




  /* --------------------- DESKTOP UI --------------------- */
  if (!mobileMode) {
    return (
      <div className="category-filter-container" ref={filterRef}>
        <div
          className="category-filter-display"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>Category</span>
          <ChevronDown
            size={18}
            className={`category-filter-arrow ${isOpen ? "open" : ""}`}
          />
        </div>

        {isOpen && (
          <div className="category-filter-panel">
            <SelectorFilter
              onSelectCategory={(category, levelName) => {
                handleCategorySelect(category);
                if (levelName) {
                  setSelectorLevel(levelName);
                  setCurrentCategoryName(category.main || category.parent || category);
                }
              }}
            />
          </div>
        )}
      </div>
    );
  }


  /* --------------------- MOBILE UI --------------------- */
  return (
    <>
      {!mobileOpen && (
        <div className="mobile-filter-row" onClick={() => setMobileOpen(true)}>
          <span>Category</span>
          <ChevronRight size={20} />
        </div>
      )}

      {mobileOpen && (
        <div className="mobile-filter-fullscreen">
          <div className="mobile-filter-header">
            {selectorLevel !== "main" ? (
              <span className="back-btn" onClick={() => setSelectorLevel("main")}>
                <ChevronLeft size={20} />
              </span>
            ) : (
              <span className="close-btn" onClick={() => setMobileOpen(false)}>✕</span>
            )}

            <h3>{selectorLevel !== "main" ? currentCategoryName : "Category"}</h3>
          </div>

          <div className="mobile-filter-body">
            <SelectorFilter
              onSelectCategory={(category, levelName) => {
                handleCategorySelect(category);
                if (levelName) {
                  setSelectorLevel(levelName);
                  setCurrentCategoryName(
                    category.main || category.parent || category
                  );
                }
              }}
            />

            <button
    className="msd-show-results-btn"
     onClick={() => {
    if (applyFilters) applyFilters(); // apply all selected filters
    setMobileOpen(false); // close mobile category panel
  }}
  >
    Show results
  </button>
          </div>

          
        </div>
      )}
    </>
  );
};

export default CategoryFilter;
