import React, { useState } from "react";
import DashboardOverview from "./DashboardOverview";
import HospitalNetwork from "./HospitalNetwork";
import ReportsAnalytics from "./ReportAnalytics";
import HelpSupport from "./HelpSupport1";
import NotificationCenter from "./NotificationCenter";
import ProfileSetting from "./ProfileSetting";
import ResourceManagement from "./ResourceManagement";
import { Button } from "../components/ui/button";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Render selected section
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview hospitalName="My Hospital" />;
      case "network":
        return <HospitalNetwork />;
      case "reports":
        return <ReportsAnalytics />;
      case "resources":
        return <ResourceManagement hospitalId="testHospital001" />;

      case "notifications":
        return <NotificationCenter />;
      case "profile":
        return <ProfileSetting />;
      case "help":
        return <HelpSupport />;
      default:
        return <DashboardOverview hospitalName="My Hospital" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="p-6 border-b bg-white shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Hospital Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Manage your hospital operations, analytics, and settings.
        </p>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap gap-3 bg-white p-4 border-b sticky top-0 z-10">
        <Button
          variant={activeTab === "overview" ? "default" : "outline"}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </Button>
        <Button
          variant={activeTab === "network" ? "default" : "outline"}
          onClick={() => setActiveTab("network")}
        >
          Hospital Network
        </Button>
        <Button
          variant={activeTab === "reports" ? "default" : "outline"}
          onClick={() => setActiveTab("reports")}
        >
          Reports & Analytics
        </Button>
        <Button
          variant={activeTab === "resources" ? "default" : "outline"}
          onClick={() => setActiveTab("resources")}
        >
          Resource Management
        </Button>
        <Button
          variant={activeTab === "notifications" ? "default" : "outline"}
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </Button>
        <Button
          variant={activeTab === "profile" ? "default" : "outline"}
          onClick={() => setActiveTab("profile")}
        >
          Profile Settings
        </Button>
        <Button
          variant={activeTab === "help" ? "default" : "outline"}
          onClick={() => setActiveTab("help")}
        >
          Help & Support
        </Button>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
