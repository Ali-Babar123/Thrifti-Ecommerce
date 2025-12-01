import React, { useState } from "react";
import { ChevronRight, ChevronLeft, CheckSquare, Square } from "lucide-react";
import { categoryData } from "./data/CategoryData";
import "./SelectorFilter.css"; // updated file name

const SelectorFilter = ({ onSelectCategory }) => {
  const [level, setLevel] = useState("main");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const [selectedFinals, setSelectedFinals] = useState([]);

  const handleMainSelect = (key) => {
    setCurrentCategory(key);
    setLevel("sub");
  };

  const handleSubSelect = (sub) => {
    setCurrentSubCategory(sub);
    setLevel("final");
  };

  const handleFinalSelect = (item) => {
    const updated = [item]; // single select
    setSelectedFinals(updated);

    const fullCategory = {
      parent: level === "final" ? currentCategory : "",
      main: currentSubCategory?.name || "",
      sub: item
    };

    onSelectCategory(fullCategory);
  };

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
    <div className="sf-selector-filter">
      {/* Header */}
      <div className="sf-cat-header">
        {level !== "main" && (
          <button
            type="button"
            className="sf-back-btn"
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
        <ul className="sf-cat-list">
          {Object.entries(categoryData).map(([key, value]) => {
            const Icon = value.main[0].icon;
            return (
              <li key={key} onClick={() => handleMainSelect(key)}>
                <div className="sf-cat-item">
                  <Icon size={20} />
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </div>
                <ChevronRight size={18} className="sf-arrow-right" />
              </li>
            );
          })}
        </ul>
      )}

      {/* Sub Categories */}
      {level === "sub" && (
        <ul className="sf-cat-list">
          {categoryData[currentCategory]?.main.map((sub, idx) => {
            const Icon = sub.icon;
            return (
              <li key={idx} onClick={() => handleSubSelect(sub)}>
                <div className="sf-cat-item">
                  <Icon size={20} />
                  <span>{sub.name}</span>
                </div>
                <ChevronRight size={18} className="sf-arrow-right" />
              </li>
            );
          })}
        </ul>
      )}

      {/* Final Sub Items */}
      {level === "final" && (
        <ul className="sf-cat-list">
          {currentSubCategory.sub.map((item, idx) => (
            <li key={idx} onClick={() => handleFinalSelect(item)}>
              <div className="sf-cat-item">
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

export default SelectorFilter;
