import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import Outstand from "../pages/Outstand";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Challenges from "../Components/Challenges";
import Forgotpassword from "../Components/Forgotpassword";
import Account from "../pages/Account";
import ResetPassword from "../Components/ResetPassword";

export default function AppRouter() {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instruction" element={<About />} />
        <Route path="/topic" element={<Products />} />
        <Route path="/outstand" element={<Outstand />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/account" element={<Account />} />
        <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
}