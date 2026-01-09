import React, { useState, useEffect, useContext } from 'react';
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
import { AuthContext } from './Contexts/AuthProvider';
import VerifyEmailChange from './components/VerifyEmailChange';
import Addtofavourite from './components/Addtofavourite';

// ProtectedRoute component
const ProtectedRoute = ({ isLoggedIn, isCheckingAuth, element }) => {
  // Show loading while login status is being checked
  if (isCheckingAuth || isLoggedIn === null || isLoggedIn === undefined) {
    return <div><Loader/></div>;
  }
  return isLoggedIn ? element : <Navigate to="/" replace={true} />;
};

const App = () => {
  const { isLoggedIn, user, setUser, setIsLoggedIn, isCheckingAuth } = useContext(AuthContext);
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    // Sync with localStorage for backward compatibility
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setLocalUser(parsedUser);
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
    setUser(userData);
    setIsLoggedIn(true);
    setLocalUser(userData);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      // Call logout endpoint to clear cookie
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Send cookies
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Clear local state regardless of API call result
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsLoggedIn(false);
      setLocalUser(null);
    }
  };

  // Use AuthContext's user if available, otherwise fall back to localUser
  const currentUser = user || localUser;

  return (
    <>
      <Navbar
        loggedIn={isLoggedIn}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        user={currentUser}
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
          element={<ProtectedRoute isLoggedIn={isLoggedIn} isCheckingAuth={isCheckingAuth} element={<SellItem />} />}
        />
        <Route
          path="/my-orders"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} isCheckingAuth={isCheckingAuth} element={<MyOrder />} />}
        />
        <Route
          path="/inbox"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} isCheckingAuth={isCheckingAuth} element={<Messages />} />}
        />
        <Route
          path="/notifications"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} isCheckingAuth={isCheckingAuth} element={<Notifications />} />}
        />
        <Route
          path="/personalization"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} isCheckingAuth={isCheckingAuth} element={<Personalization />} />}
        />
        <Route
          path="/settings/profile"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} isCheckingAuth={isCheckingAuth} element={<Settings />} />}
        />
        {/* Profile page should be public - anyone can view user profiles */}
        <Route
          path="/member/:userId"
          element={<ProfilePage />}

        />

        <Route 
        path='/member/item/favourite_list' 
        element={<Addtofavourite/>}
        />
        <Route
          path="/check-progress/:id"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} isCheckingAuth={isCheckingAuth} element={<ListingSingleProductPage />} />}
        />
        <Route
          path="/review-checkout"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} isCheckingAuth={isCheckingAuth} element={<ReviewOrder />} />}
        />
        <Route
          path="/sold"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} isCheckingAuth={isCheckingAuth} element={<Sold />} />}
        />
        <Route
          path="/reserved"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} isCheckingAuth={isCheckingAuth} element={<Reserved />} />}
        />
        <Route
          path="/settings/donations"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} isCheckingAuth={isCheckingAuth} element={<Donations />} />}
        />
        <Route
          path="/referrals"
          element={<ProtectedRoute isLoggedIn={isLoggedIn} isCheckingAuth={isCheckingAuth} element={<InviteFriends />} />}
        />

         <Route
          path="/settings/profile/email/new"
          element={<VerifyEmailChange/>}
        />
      </Routes>

  

      <Footer />
    </>
  );
};

export default App;
