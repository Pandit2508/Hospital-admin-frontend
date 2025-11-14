import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus, Minus } from "lucide-react";

export default function ResourceManagement({ hospitalName }) {
  const [resources, setResources] = useState({
    beds: { total: 250, occupied: 180, available: 70 },
    icuBeds: { total: 45, occupied: 38, available: 7 },
    ventilators: { total: 30, occupied: 12, available: 18 },
    oxygenCylinders: { total: 200, available: 150 },
    ambulances: { total: 15, active: 12, maintenance: 3 },
  });

  const [bloodBank, setBloodBank] = useState({
    "O+": 120,
    "O-": 45,
    "A+": 95,
    "A-": 30,
    "B+": 85,
    "B-": 25,
    "AB+": 40,
    "AB-": 10,
  });

  const updateResource = (key, field, value) => {
    setResources((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const updateBlood = (group, value) => {
    setBloodBank((prev) => ({ ...prev, [group]: Math.max(0, value) }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resource Management</h1>
        <p className="text-gray-600 mt-1">Update and manage hospital resources</p>
      </div>

      {/* Beds Management */}
      <Card>
        <CardHeader>
          <CardTitle>Bed Management</CardTitle>
          <CardDescription>Manage bed availability and occupancy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Total Beds</label>
              <Input
                type="number"
                value={resources.beds.total}
                onChange={(e) => updateResource("beds", "total", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Occupied</label>
              <Input
                type="number"
                value={resources.beds.occupied}
                onChange={(e) => updateResource("beds", "occupied", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Available</label>
              <div className="text-3xl font-bold text-green-600">{resources.beds.available}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ICU Beds */}
      <Card>
        <CardHeader>
          <CardTitle>ICU Beds & Ventilators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">ICU Beds</h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-gray-600">Total</label>
                  <Input
                    type="number"
                    value={resources.icuBeds.total}
                    onChange={(e) => updateResource("icuBeds", "total", parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Occupied</label>
                  <Input
                    type="number"
                    value={resources.icuBeds.occupied}
                    onChange={(e) => updateResource("icuBeds", "occupied", parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Available</label>
                  <div className="text-2xl font-bold text-green-600">{resources.icuBeds.available}</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Ventilators</h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-gray-600">Total</label>
                  <Input
                    type="number"
                    value={resources.ventilators.total}
                    onChange={(e) => updateResource("ventilators", "total", parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">In Use</label>
                  <Input
                    type="number"
                    value={resources.ventilators.occupied}
                    onChange={(e) => updateResource("ventilators", "occupied", parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Available</label>
                  <div className="text-2xl font-bold text-green-600">{resources.ventilators.available}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Oxygen & Ambulances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Oxygen Cylinders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Available Cylinders</label>
              <Input
                type="number"
                value={resources.oxygenCylinders.available}
                onChange={(e) =>
                  updateResource("oxygenCylinders", "available", parseInt(e.target.value))
                }
                className="w-full mt-2"
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Add Cylinders</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ambulances</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-gray-600">Total</label>
                <div className="text-2xl font-bold text-blue-600">{resources.ambulances.total}</div>
              </div>
              <div>
                <label className="text-xs text-gray-600">Active</label>
                <div className="text-2xl font-bold text-green-600">{resources.ambulances.active}</div>
              </div>
              <div>
                <label className="text-xs text-gray-600">Maintenance</label>
                <div className="text-2xl font-bold text-orange-600">{resources.ambulances.maintenance}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blood Bank Management */}
      <Card>
        <CardHeader>
          <CardTitle>Blood Bank Management</CardTitle>
          <CardDescription>Add or remove blood units by group</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(bloodBank).map(([group, units]) => (
              <div key={group} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-lg font-bold text-blue-600 mb-3">{group}</div>
                <div className="text-3xl font-bold text-gray-900 mb-3">{units}</div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateBlood(group, units - 1)}
                    className="flex-1"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateBlood(group, units + 1)}
                    className="flex-1"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
