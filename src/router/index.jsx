import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import ViewVideos from "../pages/ViewVideos";
import Account from "../pages/Account";
import SystemConfigure from "../pages/SystemConfigure";
import ViewNotification from "../pages/ViewNotification";
import Provider from "react-redux";
import ResetPassword from "../pages/ResetPW";

export default function Router() {
  const userState = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/:page" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPW" element={<ResetPassword />} />
        <Route path="/viewVideos" element={<ViewVideos />} />
        <Route path="/account" element={<Account />} />
        <Route
          path="/viewNotification/:intrusionId/:time"
          element={<ViewNotification />}
        />
        <Route
          path="/system"
          element={userState?.auth ? <SystemConfigure /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
