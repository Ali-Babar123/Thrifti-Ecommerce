import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categoryData } from "./data/CategoryData";
import "./Navbar.css";
import { Bell, Heart, MessageSquare, ChevronRight, Grip } from "lucide-react";
import Logo from "../assets/logo.png";
import Buttons from "../assets/buttons.png";
import mobileloc from "../assets/mobileloc.png";
import LoginModal from "./LoginModal";
import Globe from "../assets/globe.png";
import Like from "../assets/Like.png";
import SearchIcon from "../assets/search-loupe.png";
import Profile from "../assets/Ellipse 458.png";

const Navbar = ({ loggedIn, onLoginSuccess, user, onLogout }) => {  // ✅ accept props from App
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeMainCat, setActiveMainCat] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 900);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);



  const handleLogout = () => {
    onLogout(); // ✅ defined in App.jsx
    setShowDropdown(false);
  };


  const handleLinkClick = () => {
  setMenuOpen(false); // closes mobile menu
  setActiveMenu(null); // reset mega menu if needed
  setActiveMainCat(null);


  setTimeout(() => {
    setMenuOpen(false); // close menu after 150ms
  }, 350);
};

  const handleLoginSuccess = (userData) => {
    setShowLogin(false);
    onLoginSuccess(userData); // ✅ tell App we’re logged in
  };

  

  const handleStartSelling = () => {
    if (!loggedIn) {
      setShowLogin(true);
    }
  };

  useEffect(() => {
  const handleClickOutside = (event) => {
    // If dropdown is open and user clicks anywhere outside it → close it
    if (
      showDropdown &&
      !event.target.closest(".user-profile-wrapper") &&
      !event.target.closest(".user-dropdown")
    ) {
      setShowDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [showDropdown]);






  return (
    <>
      <nav className="navbar">
        {/* ---- TOP SECTION ---- */}
        <div className="navbar-top">
          <div className="navbar-left">
            <Link to="/">
              <img src={Logo} alt="Logo" className="logo-img" />
            </Link>
            <div className="search-container desktop-only">
              <img src={SearchIcon} alt="Search" className="search-icon-img" />
              <input
                type="text"
                placeholder="Search"
                className="search-input"
              />
            </div>
          </div>

          <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`bar ${menuOpen ? "open" : ""}`}></div>
            <div className={`bar ${menuOpen ? "open" : ""}`}></div>
            <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          </div>

          <div className="navbar-right desktop-only">
            {!loggedIn ? (
              <>
                <button
                  className="signin-btn"
                  onClick={() => setShowLogin(true)}
                >
                  Sign in →
                </button>
                <button className="sell-btn" onClick={handleStartSelling}>
                  Start Selling
                </button>
              </>
            ) : (
              <div className="navbar-right-loggedin">
                <Link to='/notifications'>
                <button className="icon-btn">
                  <Bell size={18} color="black" strokeWidth={2} />
                </button>
                </Link>
                <button className="icon-btn">
                  <Heart size={18} color="black" strokeWidth={2} />
                </button>
                <Link to='/inbox'>
                <button className="icon-btn">
                  <MessageSquare size={18} color="black" strokeWidth={2} />
                </button>
                  </Link>
               <div className="user-profile-wrapper">
  <img
    src={user?.profileImage || Profile}
    alt="Profile"
    className="user-avatar"
    onClick={() => setShowDropdown(!showDropdown)}
  />
  {showDropdown && (
    <div className="user-dropdown">
      <Link to='/profile'>
      <p className="user-dropdown-item">My Profile</p>
      </Link>
      <Link to='/settings/profile'>
      <p className="user-dropdown-item">Settings</p>
      </Link>
      <Link to='/personalization'>
      <p className="user-dropdown-item">Personalizations</p>
      </Link>
      <p className="user-dropdown-item">Balance</p>
      <Link to='/my-orders'>
      <p className="user-dropdown-item">My orders</p>
      </Link>
      <Link to='/settings/donations'>
      <p className="user-dropdown-item">Donations</p></Link>
      <Link to='/referrals'>
      <p className="user-dropdown-item">Invite friends</p>
      </Link>
      <p className="user-dropdown-item" onClick={handleLogout}>
        Logout
      </p>
    </div>
  )}
</div>
<Link to='/items/new'>
                <button className="sell-now-btn">Sell Now</button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ---- NAV LINKS ---- */}
        <div className="navbar-bottom desktop-only">
          <ul className="nav-links">
            {[
              "women",
              "men",
              "kids",
              
              "electronics",
              "sports",
              "entertainment",
              "accessories",
              "ourplatform",
            ].map((item) => (
              <li
                key={item}
                onMouseEnter={() => {
                  setActiveMenu(item);
                  const firstMain = categoryData[item]?.main?.[0];
                  if (firstMain) setActiveMainCat(firstMain.name);
                }}
              >
                <Link to={`/${item}`}>
                  {item === "ourplatform"
                    ? "Our Platform"
                    : item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>

                {categoryData[item] && activeMenu === item && (
                  <div
                    className="mega-menu"
                    onMouseEnter={() => setActiveMenu(item)}
                    onMouseLeave={() => {
                      setActiveMenu(null);
                      setActiveMainCat(null);
                    }}
                  >
                    {/* LEFT SIDE */}
                    <div className="mega-left">
                      <Link
                        to={`/${item}`}
                        className="see-all-link"
                        onMouseEnter={() => setActiveMainCat(null)}
                      >
                        <Grip
                          size={18}
                          strokeWidth={2}
                          className="see-all-icon"
                        />
                        <span>See all</span>
                      </Link>

                      {categoryData[item].main.map((main) => (
                        <div
                          key={main.name}
                          className={`mega-main-item ${
                            activeMainCat === main.name ? "active" : ""
                          }`}
                          onMouseEnter={() => setActiveMainCat(main.name)}
                        >
                          <div className="main-item-content">
                            {main.icon && (
                              <main.icon
                                size={20}
                                strokeWidth={1.8}
                                className="main-item-icon"
                              />
                            )}
                            <span>{main.name}</span>
                          </div>
                          <ChevronRight className="arrow-icon" size={16} />
                        </div>
                      ))}
                    </div>

                    {/* RIGHT SIDE */}
                    {activeMainCat && (
                      <div className="mega-right">
                        {categoryData[item].main
                          .find((m) => m.name === activeMainCat)
                          ?.sub.map((sub) => (
                            <Link
                              key={sub}
                              to={`/${item}/${sub.toLowerCase()}`}
                              className="mega-sub-item"
                            >
                              {sub}
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="navbar-icons">
            <div className="location">
  {isMobile ? (
    <img src={mobileloc} alt="Location" style={{ width: "20px", height: "20px" }} />
  ) : (
    <img src={Buttons} alt="Location" style={{ width: "40px", height: "40px" }} />
  )}
  <span>Rio, Brazil</span>
</div>

            <button className="icon-btn">
              <img src={Globe} alt="Globe" className="icon-img" />
            </button>
            <button className="icon-btn">
              <img src={Like} alt="Chat" className="icon-img" />
            </button>
          </div>
        </div>

        {/* ---- MOBILE MENU ---- */}
        <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
          <div className="search-container mobile-only">
            <img src={SearchIcon} alt="Search" className="search-icon-img" />
            <input type="text" placeholder="Search" className="search-input" />
            
          </div>
          
          <div className="navbar-right mobile-only">
  {!loggedIn ? (
    <>
      <button className="signin-btn" onClick={() => setShowLogin(true)}>
        Sign in →
      </button>
      <button className="sell-btn" onClick={handleStartSelling}>
        Start Selling
      </button>
    </>
  ) : (
    <div className="navbar-right-loggedin-mobile">
      <Link to='/notifications'>
        <button className="icon-btn">
          <Bell size={18} color="black" strokeWidth={2} />
        </button>
      </Link>
      <button className="icon-btn">
        <Heart size={18} color="black" strokeWidth={2} />
      </button>
      <Link to='/inbox'>
        <button className="icon-btn">
          <MessageSquare size={18} color="black" strokeWidth={2} />
        </button>
      </Link>

      {/* Profile dropdown for mobile */}
      <div className="user-profile-wrapper">
        <img
          src={user?.profileImage || Profile}
          alt="Profile"
          className="user-avatar"
          onClick={() => setShowDropdown(!showDropdown)}
        />
       
      </div>

      <Link to='/items/new'>
        <button className="sell-now-btn">Sell Now</button>
      </Link>
    </div>
  )}
</div>

          <ul className="nav-links mobile-only">
            {[
              "Women",
              "Men",
              "Kids",
             
              "Electronics",
              "Sports",
              "Entertainment",
              "Accessories",
              "ourplatform",
            ].map((link) => (
              <li key={link}>
                <Link to={`/${link.toLowerCase()}`}
                onClick={handleLinkClick}>{link}</Link>
                
              </li>
            ))}
          </ul>

          {/* --- Mobile User Links After Categories --- */}
{loggedIn && (
  <div className="mobile-user-links">

    <hr className="mobile-divider" />

    <Link to="/profile" onClick={handleLinkClick}>
      <p className="mobile-user-item">My Profile</p>
    </Link>

    <Link to="/settings/profile" onClick={handleLinkClick}>
      <p className="mobile-user-item">Settings</p>
    </Link>

    <Link to="/personalization" onClick={handleLinkClick}>
      <p className="mobile-user-item">Personalizations</p>
    </Link>

    <Link to="/my-orders" onClick={handleLinkClick}>
      <p className="mobile-user-item">My Orders</p>
    </Link>

    <Link to="/settings/donations" onClick={handleLinkClick}>
      <p className="mobile-user-item">Donations</p>
    </Link>

    <Link to="/referrals" onClick={handleLinkClick}>
      <p className="mobile-user-item">Invite Friends</p>
    </Link>

    <p className="mobile-user-item" onClick={handleLogout}>Logout</p>

    <hr className="mobile-divider" />

  </div>
)}


          <div className="navbar-icons mobile-only">
            <div className="location">
  {isMobile ? (
    <img src={mobileloc} alt="Location" style={{ width: "20px", height: "20px" }} />
  ) : (
    <img src={Buttons} alt="Location" style={{ width: "40px", height: "40px" }} />
  )}
  <span>Rio, Brazil</span>
</div>

            <button className="icon-btn">
              <img src={Globe} alt="Globe" className="icon-img" />
            </button>
            <button className="icon-btn">
              <img src={Like} alt="Chat" className="icon-img" />
            </button>
          </div>


        </div>
      </nav>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;
