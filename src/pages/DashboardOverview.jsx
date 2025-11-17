import React from "react";
import useHospitalResources from "../hooks/useHospitalResources";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";

export default function DashboardOverview({ hospitalId }) {
  const { resources, loading } = useHospitalResources(hospitalId);

  if (loading) return <p>Loading data...</p>;
  if (!resources) return <p>No resource data found.</p>;

  /* ---- Ensure safe fallback values ---- */
  const beds = resources.beds || { total: 0, occupied: 0 };
  const icuBeds = resources.icuBeds || { total: 0, occupied: 0 };
  const ventilators = resources.ventilators || { total: 0, occupied: 0 };
  const bloodBank = resources.bloodBank || {};

  /* ---- Dashboard Stats ---- */
  const stats = [
    {
      label: "Total Beds",
      value: beds.total,
      occupied: beds.occupied,
      available: beds.total - beds.occupied,
      icon: "🛏️",
    },
    {
      label: "ICU Beds",
      value: icuBeds.total,
      occupied: icuBeds.occupied,
      available: icuBeds.total - icuBeds.occupied,
      icon: "⚕️",
    },
    {
      label: "Ventilators",
      value: ventilators.total,
      occupied: ventilators.occupied,
      available: ventilators.total - ventilators.occupied,
      icon: "🫁",
    },
    {
      label: "Blood Units",
      value: Object.values(bloodBank).reduce((a, b) => a + b, 0),
      critical: Object.values(bloodBank).filter((v) => v < 20).length,
      icon: "💉",
    },
  ];

  /* ---- Blood Bank Groups ---- */
  const bloodGroups = Object.keys(bloodBank).map((group) => ({
    group,
    units: bloodBank[group],
    status:
      bloodBank[group] === 0
        ? "Critical"
        : bloodBank[group] < 20
        ? "Low"
        : "Good",
  }));

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>

      {/* Stats Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                {stat.label}
                <span className="text-2xl">{stat.icon}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500">
                {"occupied" in stat && <p>Occupied: {stat.occupied}</p>}
                {"available" in stat && <p>Available: {stat.available}</p>}
                {"critical" in stat && <p>Critical Groups: {stat.critical}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Blood Bank Status */}
      <Card>
        <CardHeader>
          <CardTitle>Blood Bank Status</CardTitle>
          <CardDescription>Live inventory</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bloodGroups.map((b, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg border">
                <div className="text-lg font-bold">{b.group}</div>
                <div className="text-2xl font-bold">{b.units}</div>
                <div
                  className={`text-xs mt-2 ${
                    b.status === "Critical"
                      ? "text-red-600"
                      : b.status === "Low"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {b.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
