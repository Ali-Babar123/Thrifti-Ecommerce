import React from "react";
import "./DeleteItemPopup.css";

const DeleteItemPopup = ({ onCancel, onConfirm }) => {
  return (
    <div className="overlay">
      <div className="popup">
        <h2>Delete Item</h2>
        <p>
          Remember: if you sold this item on Vinted, click "mark as sold"
          instead of deleting it!
        </p>
        <div className="buttons">
          <button className="cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm" onClick={onConfirm}>
            Confirm and Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemPopup;
