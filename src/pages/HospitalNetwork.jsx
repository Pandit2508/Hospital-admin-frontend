"use client"

import { useState } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Search, MapPin, Phone, Mail } from "lucide-react"

export default function HospitalNetwork() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterResource, setFilterResource] = useState("all")

  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      location: "Downtown, 2km away",
      beds: { available: 45, total: 200 },
      icuBeds: { available: 8, total: 40 },
      ventilators: { available: 12, total: 25 },
      bloodO: 85,
      phone: "+1-555-0101",
      email: "contact@cityhospital.com",
    },
    {
      id: 2,
      name: "St. Mary Medical Center",
      location: "North District, 5km away",
      beds: { available: 30, total: 180 },
      icuBeds: { available: 5, total: 35 },
      ventilators: { available: 8, total: 20 },
      bloodO: 120,
      phone: "+1-555-0102",
      email: "contact@stmary.com",
    },
    {
      id: 3,
      name: "Emergency Care Hospital",
      location: "East Side, 3km away",
      beds: { available: 60, total: 250 },
      icuBeds: { available: 15, total: 50 },
      ventilators: { available: 18, total: 35 },
      bloodO: 95,
      phone: "+1-555-0103",
      email: "contact@emergencycare.com",
    },
  ]

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterResource === "all" ||
      (filterResource === "beds" && hospital.beds.available >= 2) ||
      (filterResource === "icu" && hospital.icuBeds.available >= 2) ||
      (filterResource === "ventilators" && hospital.ventilators.available >= 2)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hospital Network</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View and refer patients to nearby hospitals
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search hospital name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterResource}
              onChange={(e) => setFilterResource(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              <option value="all">All Resources</option>
              <option value="beds">Available Beds</option>
              <option value="icu">ICU Beds</option>
              <option value="ventilators">Ventilators</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Hospital Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Hospital Info */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{hospital.name}</h3>
                  <div className="space-y-2 mt-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {hospital.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {hospital.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {hospital.email}
                    </div>
                  </div>
                </div>

                {/* Resources */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <div className="text-xs text-gray-600 dark:text-gray-400">Beds</div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {hospital.beds.available}
                    </div>
                    <div className="text-xs text-gray-500">of {hospital.beds.total}</div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <div className="text-xs text-gray-600 dark:text-gray-400">ICU</div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {hospital.icuBeds.available}
                    </div>
                    <div className="text-xs text-gray-500">of {hospital.icuBeds.total}</div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <div className="text-xs text-gray-600 dark:text-gray-400">Ventilators</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {hospital.ventilators.available}
                    </div>
                    <div className="text-xs text-gray-500">of {hospital.ventilators.total}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col justify-center gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">Refer Patient</Button>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
