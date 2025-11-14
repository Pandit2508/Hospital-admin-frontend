import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function ReportsAnalytics() {
  const bedOccupancyData = [
    { day: "Mon", occupancy: 75 },
    { day: "Tue", occupancy: 78 },
    { day: "Wed", occupancy: 82 },
    { day: "Thu", occupancy: 80 },
    { day: "Fri", occupancy: 85 },
    { day: "Sat", occupancy: 88 },
    { day: "Sun", occupancy: 83 },
  ];

  const bloodUsageData = [
    { group: "O+", used: 45, available: 120 },
    { group: "A+", used: 32, available: 95 },
    { group: "B+", used: 28, available: 85 },
    { group: "AB+", used: 15, available: 40 },
  ];

  const referralData = [
    { name: "Received", value: 24, fill: "#3b82f6" },
    { name: "Sent", value: 18, fill: "#10b981" },
    { name: "Completed", value: 22, fill: "#8b5cf6" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">View trends and generate reports</p>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700">Export as PDF</Button>
        <Button variant="outline">Export as CSV</Button>
      </div>

      {/* Bed Occupancy Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Bed Occupancy Trend</CardTitle>
          <CardDescription>Weekly occupancy rate</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bedOccupancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="occupancy"
                stroke="#3b82f6"
                name="Occupancy %"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Blood Usage Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Blood Bank Usage</CardTitle>
          <CardDescription>Usage vs availability by blood group</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bloodUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="group" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="used" fill="#ef4444" name="Used" />
              <Bar dataKey="available" fill="#10b981" name="Available" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Referral Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Referral Activity</CardTitle>
          <CardDescription>This month's referral summary</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={referralData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {referralData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">82%</div>
            <p className="text-xs text-gray-500 mt-1">+2% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">42</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Blood Units Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">120</div>
            <p className="text-xs text-gray-500 mt-1">This week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
