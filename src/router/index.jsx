import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import ViewNotification from "../pages/ViewNotification";
import ResetPassword from "../pages/ResetPW";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/:page" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPW" element={<ResetPassword />} />

        <Route
          path="/viewNotification/:intrusionId/:time"
          element={<ViewNotification />}
        />
      </Routes>
    </BrowserRouter>
  );
}
