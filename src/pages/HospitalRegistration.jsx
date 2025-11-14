import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Firestore reference
import { collection, addDoc } from "firebase/firestore";

export default function HospitalRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    type: "",
    location: "",
    contact: "",
    email: "",
    website: "",
  });

  const [loading, setLoading] = useState(false); // loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading

    try {
      // Add to Firestore
      await addDoc(collection(db, "hospitals"), formData);

      alert("Hospital registered successfully!");
      setFormData({
        name: "",
        registrationNumber: "",
        type: "",
        location: "",
        contact: "",
        email: "",
        website: "",
      }); // reset form
      navigate("/Dashboard"); // redirect
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to register hospital. Please try again.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Left section */}
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
            Streamline your hospital onboarding with CarePulse — secure,
            verified, and compliant.
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="md:w-2/3 w-full bg-white flex items-center justify-center p-10 md:p-20">
        <div className="w-full max-w-lg space-y-8">
          <h2 className="text-3xl font-bold text-center text-blue-700">
            Hospital Registration Details
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Hospital Name */}
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
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Registration Number */}
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
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Type of Hospital
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Type</option>
                <option>Private</option>
                <option>Government</option>
                <option>Multi-specialty</option>
                <option>Clinic</option>
              </select>
            </div>

            {/* Location */}
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
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Contact & Email */}
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
                  className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Website */}
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
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-3 rounded-lg transition duration-200`}
            >
              {loading ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
