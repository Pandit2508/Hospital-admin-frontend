"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, MapPin, Phone, Mail } from "lucide-react";

import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function HospitalNetwork() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterResource, setFilterResource] = useState("all");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ⬅ ADD THIS

  // ------------------------------------------------------------
  // 🔥 Fetch hospitals + resourceInfo
  // ------------------------------------------------------------
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const hospitalsCol = await getDocs(collection(db, "hospitals"));

        const hospitalList = [];

        for (const hospitalDoc of hospitalsCol.docs) {
          const hospitalId = hospitalDoc.id;
          const hospitalData = hospitalDoc.data();

          const resourceRef = doc(
            db,
            "hospitals",
            hospitalId,
            "resources",
            "resourceInfo"
          );

          const resourceSnap = await getDoc(resourceRef);

          hospitalList.push({
            id: hospitalId,
            ...hospitalData,
            resources: resourceSnap.exists()
              ? resourceSnap.data()
              : {
                  beds: { total: 0, occupied: 0 },
                  icuBeds: { total: 0, occupied: 0 },
                  ventilators: { total: 0, occupied: 0 },
                  bloodBank: {},
                },
          });
        }

        setHospitals(hospitalList);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // ------------------------------------------------------------
  // 🔍 Filter + Search
  // ------------------------------------------------------------
  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const bedsAvailable =
      hospital.resources?.beds?.total - hospital.resources?.beds?.occupied;

    const icuAvailable =
      hospital.resources?.icuBeds?.total - hospital.resources?.icuBeds?.occupied;

    const ventilatorsAvailable =
      hospital.resources?.ventilators?.total -
      hospital.resources?.ventilators?.occupied;

    const matchesFilter =
      filterResource === "all" ||
      (filterResource === "beds" && bedsAvailable > 0) ||
      (filterResource === "icu" && icuAvailable > 0) ||
      (filterResource === "ventilators" && ventilatorsAvailable > 0);

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-400 text-lg">
        Loading hospital data...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Hospital Network
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View and refer patients to nearby hospitals
        </p>
      </div>

      {/* Search + Filter */}
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
        {filteredHospitals.map((hospital) => {
          const resources = hospital.resources || {};

          const bedsAvailable =
            resources.beds?.total - resources.beds?.occupied;

          const icuAvailable =
            resources.icuBeds?.total - resources.icuBeds?.occupied;

          const ventilatorsAvailable =
            resources.ventilators?.total - resources.ventilators?.occupied;

          return (
            <Card
              key={hospital.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Hospital Info */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {hospital.name}
                    </h3>

                    <div className="space-y-2 mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {hospital.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {hospital.contact}
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
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Beds
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {bedsAvailable}
                      </div>
                      <div className="text-xs text-gray-500">
                        of {resources.beds?.total || 0}
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        ICU
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {icuAvailable}
                      </div>
                      <div className="text-xs text-gray-500">
                        of {resources.icuBeds?.total || 0}
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Ventilators
                      </div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {ventilatorsAvailable}
                      </div>
                      <div className="text-xs text-gray-500">
                        of {resources.ventilators?.total || 0}
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS (UPDATED) */}
                  <div className="flex flex-col justify-center gap-2">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() =>
                        navigate(`/refer-patient/${hospital.id}`)
                      }
                    >
                      Refer Patient
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => navigate(`/hospital/${hospital.id}`)}
                    >
                      View Details
                    </Button>
                  </div>

                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
