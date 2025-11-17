import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import CategorySelector from "./CategorySelector";
import "./CategoryDropdown.css";

const CategoryDropdown = ({ onSelectCategory }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select Category");

  const handleCategorySelect = (category) => {
    setSelected(category);
    onSelectCategory(category);
    setOpen(false);
  };

  return (
    <div className="category-dropdown">
      <div className="dropdown-display" onClick={() => setOpen(!open)}>
        <span>{selected}</span>
        <ChevronDown className={`arrow ${open ? "open" : ""}`} />
      </div>

      {open && (
        <div className="dropdown-panel">
          <CategorySelector onSelectCategory={handleCategorySelect} />
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
