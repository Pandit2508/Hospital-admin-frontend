import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function HospitalRegistration() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    type: "",
    location: "",
    contact: "",
    email: "",
    website: "",
  });

  // -----------------------------------------------------
  // 🔥 Load logged-in user
  // -----------------------------------------------------
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);

        // -----------------------------------------------------
        // 🔗 Check if user already linked to a hospital
        // -----------------------------------------------------
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().hospitalId) {
          navigate(`/dashboard/${userSnap.data().hospitalId}`);
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -----------------------------------------------------
  // 🔥 Handle Registration
  // -----------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!currentUser) {
        alert("You must be logged in.");
        return;
      }

      const hospitalId = formData.registrationNumber.trim();
      if (!hospitalId) {
        alert("Invalid Hospital Registration Number");
        return;
      }

      const hospitalRef = doc(db, "hospitals", hospitalId);
      const hospitalSnap = await getDoc(hospitalRef);

      if (!hospitalSnap.exists()) {
        // 🏥 Create NEW hospital
        await setDoc(hospitalRef, {
          ...formData,
          createdAt: Date.now(),
        });

        // 🧱 Create default resources ONLY once
        const resourceRef = doc(db, "hospitals", hospitalId, "resources", "resourceInfo");
        const resourceSnap = await getDoc(resourceRef);
        if (!resourceSnap.exists()) {
          await setDoc(resourceRef, {
            beds: { total: 0, occupied: 0 },
            icuBeds: { total: 0, occupied: 0 },
            ventilators: { total: 0, occupied: 0 },
            oxygenCylinders: { available: 0 },
            ambulances: { total: 0, active: 0, maintenance: 0 },
            bloodBank: {
              "O+": 0, "O-": 0,
              "A+": 0, "A-": 0,
              "B+": 0, "B-": 0,
              "AB+": 0, "AB-": 0,
            },
          });
        }

        alert("Hospital Registered Successfully!");
      } else {
        // 🔗 Hospital exists → just link user
        alert("Hospital already exists. Your account is linked.");
      }

      // 👤 Map user to this hospital (non-destructive merge)
      await setDoc(doc(db, "users", currentUser.uid), { hospitalId }, { merge: true });

      // 🔀 Redirect to dashboard
      navigate(`/dashboard/${hospitalId}`);
    } catch (error) {
      console.error(error);
      alert("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Left Panel */}
      <div className="md:w-1/3 w-full bg-gradient-to-br from-blue-700 to-blue-500 flex flex-col justify-center items-center text-white p-10 rounded-r-3xl shadow-lg">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/hospital-room.png"
              alt="logo"
              className="w-8 h-8"
            />
            <h1 className="text-3xl font-bold tracking-tight">CarePulse</h1>
          </div>
          <p className="text-base md:text-lg text-blue-100 max-w-xs mx-auto leading-relaxed">
            Secure, verified, and compliant onboarding for your hospital.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="md:w-2/3 w-full bg-white flex items-center justify-center p-10 md:p-20">
        <div className="w-full max-w-lg space-y-8">
          <h2 className="text-3xl font-bold text-center text-blue-700">
            Hospital Registration Details
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Hospital Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter hospital name"
                className="mt-1 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Hospital Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                required
                placeholder="Official registration number"
                className="mt-1 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Type of Hospital
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 bg-white"
              >
                <option value="">Select Type</option>
                <option>Private</option>
                <option>Government</option>
                <option>Multi-specialty</option>
                <option>Clinic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="City / State"
                className="mt-1 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-600">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  placeholder="Helpline / Reception"
                  className="mt-1 w-full border border-gray-300 rounded-lg p-3"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-600">
                  Official Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="contact@hospital.org"
                  className="mt-1 w-full border border-gray-300 rounded-lg p-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Website (Optional)
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://hospitalwebsite.com"
                className="mt-1 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-3 rounded-lg transition`}
            >
              {loading ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
