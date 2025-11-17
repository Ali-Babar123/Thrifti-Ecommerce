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
import Reserved from './components/ReservedSold'

const ProtectedRoute = ({ isLoggedIn, element }) => {
  return isLoggedIn ? element : <Navigate to="/" replace />;
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);  


  useEffect(() => {
    const loginStatus = localStorage.getItem("loggedIn") === "true";
    const storedUser = localStorage.getItem("user");


    setLoggedIn(loginStatus);
    if (storedUser) setUser(JSON.parse(storedUser)); // ✅ load saved user
  }, []);

  // When user logs in successfully
  const handleLoginSuccess = (userData) => {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    setLoggedIn(true);
     setUser(userData);
  };

  // When user logs out
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ remove saved user
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

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Mens />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/ourplatform" element={<OurPlateform />} />
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
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<Settings/>} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<ProfilePage/>} />}
        />

        <Route
          path="/check-progress"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<ListingSingleProductPage/>} />}
        />


        <Route
          path="/review-checkout"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<ReviewOrder/>} />}
        />

         <Route
          path="/sold"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<Sold/>} />}
        />


        <Route
          path="/reserved"
          element={<ProtectedRoute isLoggedIn={loggedIn} element={<Reserved/>} />}
        />
      </Routes>



      
      <Footer />
    </>
  );
};

export default App;
