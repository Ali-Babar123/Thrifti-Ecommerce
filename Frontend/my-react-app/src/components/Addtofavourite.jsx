import React, { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext/ProductContext";
import "./Addtofavourite.css";
import Favourite from '../assets/Favourite.png'

const Addtofavourite = () => {
  const { products, likedProducts, likesCount, toggleLike } = useContext(ProductContext);
  const navigate = useNavigate();

  const likedProductList = products.filter(product => likedProducts[product._id]);

  const handleToggleLike = (productId) => {
    toggleLike(productId);
  };

  return (
    <div className="favourites-page">
    <h1 className="favourite-heading">Favourited items</h1>
      {likedProductList.length === 0 ? (
        <div className="favourites-empty">
          <img src={Favourite} alt="" />
          <h2>Save your favourites</h2>
          <p>Favourite some items and find them here</p>
          <button onClick={() => navigate("/")}>Browse</button>
        </div>
      ) : (
        <div className="favourites-grid">
          {likedProductList.map((item) => (
            <div
              className="top-pick-card"
              key={item._id}
              onClick={() => navigate(`/singleproduct/${item._id}`, { state: item })}
              style={{ cursor: "pointer" }}
            >
              <div
                className="top-pick-image"
                style={{
                  backgroundImage: `url(${item.images?.[0] || "https://via.placeholder.com/150"})`,
                }}
              >
                <div
                  className="top-pick-like"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleLike(item._id);
                  }}
                >
                  {likedProducts?.[item._id] ? (
                    <FaHeart size={17} color="black" />
                  ) : (
                    <FaRegHeart size={17} color="gray" />
                  )}
                  <span className="like-count">
                    {likesCount?.[item._id] ?? item.likes?.length ?? 0}
                  </span>
                </div>
              </div>

              <div className="top-pick-info">
                <div>
                  <h3>{item.title}</h3>
                  <p className="top-pick-condition">
                    {item.size} - {item.condition}
                  </p>
                </div>
                <p className="top-pick-price">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addtofavourite;
