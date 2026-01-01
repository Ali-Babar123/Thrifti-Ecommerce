import React, { useState, useEffect,useContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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

/** Contexts */
import {AuthContext} from "./Contexts/AuthProvider";

// ProtectedRoute component
const ProtectedRoute = ({ isLoggedIn, element }) => {
  if (isLoggedIn === null) {
    // Show loading while login status is being checked
    return <div><Loader/></div>;
  }
  return isLoggedIn ? element : <Navigate to="/" replace={true} />;
};

const App = () => {

  const {user,isLoggedIn,setIsLoggedIn,setUser} = useContext(AuthContext);
  const navigate = useNavigate();


 
  const handleLoginSuccess = (userData) => {
  setIsLoggedIn(true);
  setUser(userData);
};

const handleLogout = () => {
  localStorage.removeItem("token"); // ✅ only token matters
  setIsLoggedIn(false);
  setUser(null);
  navigate("/", {replace:true});
};

  return (
    <>
      <Navbar
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
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
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<SellItem />} />}
        />
        <Route
          path="/my-orders"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<MyOrder />} />}
        />
        <Route
          path="/inbox"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Messages />} />}
        />
        <Route
          path="/notifications"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Notifications />} />}
        />
        <Route
          path="/personalization"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Personalization />} />}
        />
        <Route
          path="/settings/profile"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Settings />} />}
        />
        <Route
          path="/member/:userId"
          element={<ProtectedRoute isLoggedIn={isLoggedIn && user != null} element={<ProfilePage />} />}
        />
        <Route
          path="/check-progress/:id"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<ListingSingleProductPage />} />}
        />
        <Route
          path="/review-checkout"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<ReviewOrder />} />}
        />
        <Route
          path="/sold"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Sold />} />}
        />
        <Route
          path="/reserved"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Reserved />} />}
        />
        <Route
          path="/settings/donations"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Donations />} />}
        />
        <Route
          path="/referrals"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<InviteFriends />} />}
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
