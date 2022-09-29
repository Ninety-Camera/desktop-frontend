import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import ViewVideos from "../pages/ViewVideos";
import Account from "../pages/Account";
import ViewNotification from "../pages/ViewNotification";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/signUp" element={<SignUpPage/>}/> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/viewVideos" element={<ViewVideos />} />
        <Route path="/account" element={<Account />} />
        <Route path="/viewNotification" element={<ViewNotification />} />
      </Routes>
    </BrowserRouter>
  );
}