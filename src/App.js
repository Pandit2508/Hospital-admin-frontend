// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HospitalRegistration from "./pages/HospitalRegistration";

// New pages you have created
import HospitalNetwork from "./pages/HospitalNetwork";
import SendReferral from "./pages/SendReferral";
import ReferralDetails from "./pages/ReferralDetails";
import ReferralNotifications from "./pages/ReferralNotifications";
import ResourceManagement from "./pages/ResourceManagement";
import ReportAnalytics from "./pages/ReportAnalytics";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route path="/dashboard/:hospitalId" element={<Dashboard />} />
        <Route path="/HospitalRegistration" element={<HospitalRegistration />} />

        {/* Hospital Network */}
        <Route path="/hospital-network" element={<HospitalNetwork />} />

        {/* Referral System */}
        <Route path="/refer-patient/:hospitalId" element={<SendReferral />} />
        <Route path="/hospital/:hospitalId" element={<ReferralDetails />} />
        <Route
          path="/referral-notifications"
          element={<ReferralNotifications />}
        />

        {/* Other dashboard tabs */}
        <Route
          path="/resource-management/:hospitalId"
          element={<ResourceManagement />}
        />
        <Route
          path="/report-analytics/:hospitalId"
          element={<ReportAnalytics />}
        />
      </Routes>
    </>
  );
}

export default App;
