import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { AlertCircle } from "lucide-react";

export default function DashboardOverview({ hospitalName }) {
  const stats = [
    { label: "Total Beds", value: "250", occupied: "180", available: "70", icon: "🛏️" },
    { label: "ICU Beds", value: "45", occupied: "38", available: "7", icon: "⚕️" },
    { label: "Ventilators", value: "30", occupied: "12", available: "18", icon: "🫁" },
    { label: "Blood Units", value: "450", critical: "50", icon: "💉" },
  ];

  const bloodGroups = [
    { group: "O+", units: 120, status: "Good" },
    { group: "O-", units: 45, status: "Low" },
    { group: "A+", units: 95, status: "Good" },
    { group: "A-", units: 30, status: "Critical" },
    { group: "B+", units: 85, status: "Good" },
    { group: "B-", units: 25, status: "Critical" },
    { group: "AB+", units: 40, status: "Low" },
    { group: "AB-", units: 10, status: "Critical" },
  ];

  const alerts = [
    { type: "Critical", message: "AB- Blood Stock Critical - Only 10 units available", time: "5 mins ago" },
    { type: "Warning", message: "ICU Occupancy at 84% - Consider patient transfers", time: "15 mins ago" },
    { type: "Info", message: "Oxygen cylinders refilled - 150 units added", time: "1 hour ago" },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Last updated: {new Date().toLocaleString()}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-2 space-y-1">
                {stat.occupied && <p>Occupied: {stat.occupied}</p>}
                {stat.available && <p>Available: {stat.available}</p>}
                {stat.critical && <p>Critical: {stat.critical}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Blood Bank Status */}
      <Card>
        <CardHeader>
          <CardTitle>Blood Bank Status</CardTitle>
          <CardDescription>Current blood inventory by group</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bloodGroups.map((blood, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-lg font-bold text-blue-600">{blood.group}</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">{blood.units}</div>
                <div
                  className={`text-xs font-medium mt-2 ${
                    blood.status === "Critical"
                      ? "text-red-600"
                      : blood.status === "Low"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {blood.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Active Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === "Critical"
                    ? "bg-red-50 border-red-500"
                    : alert.type === "Warning"
                    ? "bg-orange-50 border-orange-500"
                    : "bg-blue-50 border-blue-500"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className={`font-semibold ${
                        alert.type === "Critical"
                          ? "text-red-900"
                          : alert.type === "Warning"
                          ? "text-orange-900"
                          : "text-blue-900"
                      }`}
                    >
                      {alert.type}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
