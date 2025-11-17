import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardOverview from "./DashboardOverview";
import HospitalNetwork from "./HospitalNetwork";
import ReportsAnalytics from "./ReportAnalytics";
import HelpSupport from "./HelpSupport1";
import NotificationCenter from "./NotificationCenter";
import ProfileSetting from "./ProfileSetting";
import ResourceManagement from "./ResourceManagement";

import { Button } from "../components/ui/button";
import { auth } from "../firebase";

const Dashboard = () => {
  const navigate = useNavigate();
  const { hospitalId } = useParams();
  const [loadedId, setLoadedId] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  // ------------------------------------------------------
  // 🔥 Check Auth & Load hospitalId
  // ------------------------------------------------------
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/Login");
      } else if (hospitalId) {
        setLoadedId(hospitalId);
      } else {
        navigate("/Login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [hospitalId, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-blue-600 font-semibold text-lg">Loading dashboard...</p>
      </div>
    );
  }

  if (!loadedId) {
    return (
      <div className="p-6 text-center text-red-500">
        Hospital ID not found. Redirecting to login...
      </div>
    );
  }

  // ------------------------------------------------------
  // 🔥 Render the active tab content
  // ------------------------------------------------------
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview hospitalId={loadedId} />;
      case "network":
        return <HospitalNetwork hospitalId={loadedId} />;
      case "reports":
        return <ReportsAnalytics hospitalId={loadedId} />;
      case "resources":
        return <ResourceManagement hospitalId={loadedId} />;
      case "notifications":
        return <NotificationCenter hospitalId={loadedId} />;
      case "help":
        return <HelpSupport />;
      default:
        return <DashboardOverview hospitalId={loadedId} />;
    }
  };

  // ------------------------------------------------------
  // 🔥 Main UI
  // ------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="p-6 border-b bg-white shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Hospital Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Managing Hospital: <strong>{loadedId}</strong>
        </p>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap gap-2 bg-white p-4 border-b sticky top-0 z-10">
        {[
          ["overview", "Overview"],
          ["network", "Hospital Network"],
          ["reports", "Reports & Analytics"],
          ["resources", "Resource Management"],
          ["notifications", "Notifications"],
          ["help", "Help & Support"],
        ].map(([key, label]) => (
          <Button
            key={key}
            variant={activeTab === key ? "default" : "outline"}
            onClick={() => setActiveTab(key)}
            className={activeTab === key ? "bg-blue-600 text-white" : ""}
          >
            {label}
          </Button>
        ))}
      </nav>

      {/* Main Page Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
