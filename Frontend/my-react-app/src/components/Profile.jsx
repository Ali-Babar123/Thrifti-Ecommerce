import React, { useState, useEffect, useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./Profile.css";
import ProfileImage from "../assets/settingsimage.svg";
import JacketImage from "../assets/Modern.svg";
import { useParams,Link } from "react-router-dom";
import userEmptyState from '/user-empty-state.svg'
import {
  MapPin,
  Clock,
  Users,
  Star,
  Package,
  Zap,
  ShieldCheck,
} from "lucide-react";
import API from "../api/api";
import Loader from "./loader";
import { FollowContext } from "../FollowContext/FollowProvider";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("listing"); // 👈 Controls which section to show
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState({});
  const [selected, setSelected] = useState({});
   const [profile, setProfile] = useState(null);


 const {userId} = useParams();
//  console.log(userId)



  useEffect(()=>{
    if (!userId) return;

    const fetchProfile = async() =>{
      const res = await API.get(`/api/auth/member?userId=${userId}`,{withCredentials: true});
      console.log(res.data);
      try { if (res.data.success){
        setProfile(res.data.profile);
      }
      else{
        console.log(res.data.message);
      }
    }
      catch(err){
        console.error("Error fetching profile:", err);
  }
};
      fetchProfile();
    }, [userId])
    
    
  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckbox = (key) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper function to get relative time
const timeAgo = (date) => {
  if (!date) return "N/A";

  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + " year" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval + " month" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + " day" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + " hour" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + " minute" + (interval > 1 ? "s" : "") + " ago";

  return Math.floor(seconds) + " second" + (seconds > 1 ? "s" : "") + " ago";
};



  const categoryOptions = [
    {
      title: "Men's Clothing",
      sub: [
        "T-shirts & Shirts",
        "Jeans & Trousers",
        "Jackets & Coats",
        "Hoodies & Sweatshirts",
        "Activewear",
        "Swimwear",
      ],
    },
    { title: "Women's Clothing", sub: [] },
    { title: "Shoes", sub: [] },
    { title: "Accessories", sub: [] },
    { title: "Kids & Baby", sub: [] },
    { title: "Vintage", sub: [] },
  ];
  
  if (!profile) return <div><Loader/></div>;

  return (
    <div className="profile-page">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-info">
          <img  src={profile.profileImage || userEmptyState} onError={ (e) => e.target.src = userEmptyState} 
          loading="lazy" alt="Profile" className="profile-avatar" />
          <div className="profile-details">
            <h2 className="profile-name">{profile.username}</h2>
            <p className="profile-reviews">
              <Star size={16} fill="gold" stroke="gold" /> 342 reviews
            </p>
            <p className="profile-badges">
              <Package size={15} /> Frequent Uploads ·{" "}
              <Zap size={15} /> Speedy Shipping ·{" "}
              <ShieldCheck size={15} />{" "}
{profile.isVerified ? "Verified" : "Not verified"} ·{" "}

              <MapPin size={15} /> Location:  {profile.location ? `${profile.location.city}, ${profile.location.country}` : "Unknown"} 
              <Clock size={15} />  Last seen: {timeAgo(profile.lastSeen) || "N/A"}
            </p>
            <p className="profile-followers">
              <Users size={15} /> {profile.followers || 0} followers, {profile.following || 0 } following
            </p>
          </div>
        </div>
        <button className="active-btn">Active</button>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`tab ${activeTab === "listing" ? "active" : ""}`}
          onClick={() => setActiveTab("listing")}
        >
          Listing
        </button>
        <button
          className={`tab ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* CONDITIONAL RENDERING BELOW */}
      {activeTab === "listing" ? (
        <>
          {/* Filter Section */}
          <div className="filter-section">
            <button className="filter-btn active">All</button>
            <div className="filter-dropdown">
              <button
                className="filter-toggle"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Category{" "}
                <span>
                  {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>

              {dropdownOpen && (
                <div className="filter-menu">
                  <input
                    type="text"
                    placeholder="Search"
                    className="filter-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  {categoryOptions.map((cat) => {
                    const filteredSub = cat.sub.filter((s) =>
                      s.toLowerCase().includes(search.toLowerCase())
                    );

                    return (
                      <div key={cat.title} className="filter-category">
                        <div
                          className="filter-category-title"
                          onClick={() => toggleSection(cat.title)}
                        >
                          {cat.title}
                          <span>
                            {cat.sub.length > 0 ? (
                              openSections[cat.title] ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )
                            ) : (
                              <FaChevronDown style={{ opacity: 0.4 }} />
                            )}
                          </span>
                        </div>

                        {openSections[cat.title] && filteredSub.length > 0 && (
                          <div className="filter-subcategories">
                            {filteredSub.map((item) => (
                              <label key={item}>
                                <input
                                  type="checkbox"
                                  checked={!!selected[item]}
                                  onChange={() => handleCheckbox(item)}
                                />
                                {item}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <select className="filter-select">
              <option>Sort by</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
            <select className="filter-select">
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Listing Section */}
            <h3 className="product-length">{profile.products.length} item{profile.length !== 1 ? "s" : ""}</h3>
          <div className="listing-section">
             {profile.products.map((product) => (
              <div key={product._id} className="item-card">
                <img src={product.images?.[0] || JacketImage} alt={product.title} className="item-image" />
                <Link to={`/check-progress/${product._id}`}>
                  <div className="item-status">Check in progress</div>
                </Link>
                <p className="item-stats">0 Views</p>
                <p className="item-stats">0 Fav</p>
                <button className="bump-btn">Bump</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        // 🔹 REVIEWS SECTION
<div className="reviews-section">
  <div className="reviews-header">
    <h2 className="review-rating">4.8</h2>
    <div>
      <p className="review-stars">⭐⭐⭐⭐⭐</p>
      <p className="review-count">(342 reviews)</p>
    </div>
  </div>

  <div className="review-card">
    <div className="review-user">
      <div className="review-left">
        <img src={ProfileImage} alt="user" className="review-avatar" />
        <div className="review-info">
          <p className="review-username">CatLover92 · 22 Jul</p>
          <span className="verified-badge">Verified</span>
        </div>
      </div>
      <div className="review-stars">⭐⭐⭐⭐⭐</div>
    </div>

    <p className="review-text">
      Kali was amazing with our cats! 😻 This was our first time using a
      pet-sitting service, so we were naturally quite anxious. We took a
      chance on Kali and completely lucked out! We booked Kali to come
      twice a day for three days. Kali spent a considerable amount of
      time playing and engaging with our cats. She also sent us very
      funny and detailed reports...
    </p>
    <button className="read-more-btn">Read More</button>
  </div>
</div>

      )}
    </div>
  );
};

export default ProfilePage;
