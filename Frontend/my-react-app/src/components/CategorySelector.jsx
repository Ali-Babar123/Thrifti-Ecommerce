import React, { useState } from "react";
import { ChevronRight, ChevronLeft, CheckSquare, Square } from "lucide-react";
import { categoryData } from "./data/CategoryData";
import "./CategorySelector.css";

const CategorySelector = ({ onSelectCategory }) => {
  const [level, setLevel] = useState("main");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const [selectedFinals, setSelectedFinals] = useState([]);

  // Go deeper into selected main category
  const handleMainSelect = (key) => {
    setCurrentCategory(key);
    setLevel("sub");
  };

  // Go to final subcategory list
  const handleSubSelect = (sub) => {
    setCurrentSubCategory(sub);
    setLevel("final");
  };

  // Select/deselect final items
  const handleFinalSelect = (item) => {
    setSelectedFinals((prev) => {
      const updated =
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item];
      onSelectCategory(updated); // only send selected finals
      return updated;
    });
  };

  // Go back
  const handleBack = () => {
    if (level === "final") {
      setLevel("sub");
      setCurrentSubCategory(null);
      setSelectedFinals([]);
    } else if (level === "sub") {
      setLevel("main");
      setCurrentCategory(null);
    }
  };

  return (
    <div className="category-selector">
      {/* Header */}
      <div className="cat-header">
        {level !== "main" && (
          <button
  type="button"
  className="back-btn"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    handleBack();
  }}
>
  <ChevronLeft size={20} />
</button>

        )}
        <h3>
          {level === "main"
            ? "Find a Category"
            : level === "sub"
            ? currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)
            : currentSubCategory?.name}
        </h3>
      </div>

      {/* Main Categories */}
      {level === "main" && (
        <ul className="cat-list">
          {Object.entries(categoryData).map(([key, value]) => {
            const Icon = value.main[0].icon;
            return (
              <li key={key} onClick={() => handleMainSelect(key)}>
                <div className="cat-item">
                  <Icon size={20} />
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </div>
                <ChevronRight size={18} className="arrow-right" />
              </li>
            );
          })}
        </ul>
      )}

      {/* Sub Categories */}
      {level === "sub" && (
        <ul className="cat-list">
          {categoryData[currentCategory]?.main.map((sub, idx) => {
            const Icon = sub.icon;
            return (
              <li key={idx} onClick={() => handleSubSelect(sub)}>
                <div className="cat-item">
                  <Icon size={20} />
                  <span>{sub.name}</span>
                </div>
                <ChevronRight size={18} className="arrow-right" />
              </li>
            );
          })}
        </ul>
      )}

      {/* Final Sub Items (Multi-select) */}
      {level === "final" && (
        <ul className="cat-list">
          {currentSubCategory.sub.map((item, idx) => (
            <li key={idx} onClick={() => handleFinalSelect(item)}>
              <div className="cat-item">
                {selectedFinals.includes(item) ? (
                  <CheckSquare size={18} />
                ) : (
                  <Square size={18} />
                )}
                <span>{item}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategorySelector;
