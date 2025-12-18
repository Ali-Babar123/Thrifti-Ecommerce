import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/home';
import Footer from './components/Footer';
import Mens from './components/Mens';
import SingleProduct from './components/SingleProduct';
import CheckoutPage from './components/Checkout';
import Payment from './components/Payment';
import Women from './components/Women';
import Kids from './components/Kids';
import Electronics from './components/Electronics';
import Sports from './components/Sports';
import Entertainment from './components/Entertainment';
import Accessories from './components/Accessories';
import OurPlateform from './components/Ourplateform';
import SellItem from './components/SellItem';
import MyOrder from './components/MyOrders';
import Messages from './components/Messages';
import Notifications from './components/Notification';
import Personalization from './components/Personlization';
import Settings from './components/Settings';
import ProfilePage from './components/Profile';
import ListingSingleProductPage from './components/ListingSingleProduct';
import ReviewOrder from './components/ReviewOrder';
import Sold from './components/Sold';
import Reserved from './components/ReservedSold';
import Donations from './components/Donations';
import InviteFriends from './components/InviteFriends';
import { Toaster } from 'sonner';
import Category from './components/Category';
import Loader from './components/loader';

// ProtectedRoute component
const ProtectedRoute = ({ isLoggedIn, element }) => {
  if (isLoggedIn === null) {
    // Show loading while login status is being checked
    return <div><Loader/></div>;
  }
  return isLoggedIn ? element : <Navigate to="/" replace={true} />;
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null); // null initially to prevent early redirect
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem("loggedIn") === "true";
    const storedUser = localStorage.getItem("user");

    setLoggedIn(loginStatus);

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Handle successful login
  const handleLoginSuccess = (userData) => {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    setLoggedIn(true);
    setUser(userData);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <>
      <Navbar
        loggedIn={loggedIn}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        user={user}
      />

      <Toaster richColors position="top-right" />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<Payment />} />

        {/* Protected Routes */}
        <Route
          path="/items/new"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<SellItem />} />}
        />
        <Route
          path="/my-orders"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<MyOrder />} />}
        />
        <Route
          path="/inbox"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<Messages />} />}
        />
        <Route
          path="/notifications"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<Notifications />} />}
        />
        <Route
          path="/personalization"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<Personalization />} />}
        />
        <Route
          path="/settings/profile"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<Settings />} />}
        />
        <Route
          path="/member/:userId"
          element={<ProtectedRoute isLoggedIn={loggedIn && user != null} element={<ProfilePage />} />}
        />
        <Route
          path="/check-progress"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<ListingSingleProductPage />} />}
        />
        <Route
          path="/review-checkout"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<ReviewOrder />} />}
        />
        <Route
          path="/sold"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<Sold />} />}
        />
        <Route
          path="/reserved"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<Reserved />} />}
        />
        <Route
          path="/settings/donations"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<Donations />} />}
        />
        <Route
          path="/referrals"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<InviteFriends />} />}
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
