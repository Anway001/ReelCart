import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from '../pages/auth/UserLogin';
import UserRegister from '../pages/auth/UserRegister';
import PartnerLogin from '../pages/auth/PartnerLogin';
import PartnerRegister from '../pages/auth/PartnerRegister';
import Home from "../General/Home";
import CreateFood from "../Food-partner/CreateFood";
import Profile from "../Food-partner/Profile";


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
  <Route path="/createFood" element={<CreateFood />} />
  <Route path="/partner/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
