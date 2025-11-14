import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from '../pages/auth/UserLogin';
import UserRegister from '../pages/auth/UserRegister';
import PartnerLogin from '../pages/auth/PartnerLogin';
import PartnerRegister from '../pages/auth/PartnerRegister';
import Home from "../General/Home";
import Explore from "../General/Explore";
import CreateFood from "../Food-partner/CreateFood";
import Profile from "../Food-partner/Profile";
import PartnerDashboard from "../Food-partner/PartnerDashboard";
import Saved from "../General/Saved";
import Cart from "../General/Cart";
import Checkout from "../General/Checkout";
import PartnerOrders from "../Food-partner/PartnerOrders";
import OrderHistory from "../General/OrderHistory";
import OrderDetail from "../General/OrderDetail";
import ProductDetail from "../General/ProductDetail";

function AppRouter() {
  return (
    <Router>
      <Routes>
  {/* User Authentication Routes */}
  <Route path="/user/register" element={<UserRegister />} />
  <Route path="/user/login" element={<UserLogin />} />

  {/* Partner Authentication Routes */}
  <Route path="/foodpartner/register" element={<PartnerRegister />} />
  <Route path="/foodpartner/login" element={<PartnerLogin />} />
  {/* home route */}
  <Route path="/" element={<Home />} />
  <Route path="/explore" element={<Explore />} />
  <Route path="/saved" element={<Saved />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/orders" element={<OrderHistory />} />
  <Route path="/orders/:orderId" element={<OrderDetail />} />
  <Route path="/createFood" element={<CreateFood />} />
  <Route path="/edit-food/:id" element={<CreateFood />} />
  <Route path="/product/:id" element={<ProductDetail />} />
  <Route path="/partner/dashboard" element={<PartnerDashboard />} />
  <Route path="/partner/orders" element={<PartnerOrders />} />
  <Route path="/partner/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
