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
        <Route
          path="/dashboard/:page"
          element= {<Dashboard />}
         // element={userState?.auth ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPW" element={<ResetPassword />} />
        <Route
          path="/viewVideos"
          element={<ViewVideos />}
          //element={userState?.auth ? <ViewVideos /> : <Navigate to="/" />}
        />
        <Route
          path="/account"
          element={<Account />}
          //element={userState?.auth ? <Account /> : <Navigate to="/" />}
        />
        <Route
          path="/viewNotification"
          element={<ViewNotification />}
          //element={userState?.auth ? <ViewNotification /> : <Navigate to="/" />}
        />
        <Route
          path="/system"
          element={userState?.auth ? <SystemConfigure /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
