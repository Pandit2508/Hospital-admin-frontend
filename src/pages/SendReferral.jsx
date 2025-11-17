import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const SendReferral = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [message, setMessage] = useState("");
  const [resources, setResources] = useState({
    bed: 0,
    ventilator: 0,
    doctor: 0,
  });

  const senderHospitalId = localStorage.getItem("hospitalID");

  // Load hospitals except the current hospital
  useEffect(() => {
    const loadHospitals = async () => {
      const querySnapshot = await getDocs(collection(db, "hospitals"));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHospitals(list.filter(h => h.id !== senderHospitalId));
    };
    loadHospitals();
  }, [senderHospitalId]);

  // Send referral request
  const sendReferral = async () => {
    if (!selectedHospital || !message.trim()) {
      alert("Please select a hospital and enter a message.");
      return;
    }

    const referral = await addDoc(collection(db, "referrals"), {
      fromHospitalId: senderHospitalId,
      toHospitalId: selectedHospital,
      message,
      resourcesRequested: resources,
      status: "pending",
      timestamp: new Date(),
    });

    // Notification for target hospital
    await addDoc(collection(db, "notifications"), {
      hospitalId: selectedHospital,
      type: "referral-request",
      referralId: referral.id,
      message: "New patient referral request received",
      read: false,
      timestamp: new Date(),
    });

    alert("Referral Sent Successfully!");

    // Reset fields
    setMessage("");
    setSelectedHospital("");
    setResources({ bed: 0, ventilator: 0, doctor: 0 });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">

      <h2 className="text-2xl font-bold mb-6">Send Referral Request</h2>

      {/* Hospital Dropdown */}
      <div className="mb-5">
        <label className="block text-lg font-medium mb-1">Select Hospital</label>
        <select
          value={selectedHospital}
          onChange={(e) => setSelectedHospital(e.target.value)}
          className="w-full border p-2 rounded-md"
        >
          <option value="">-- Choose Hospital --</option>
          {hospitals.map(h => (
            <option key={h.id} value={h.id}>
              {h.name} ({h.email})
            </option>
          ))}
        </select>
      </div>

      {/* Referral message */}
      <div className="mb-5">
        <label className="block text-lg font-medium mb-1">Referral Message</label>
        <textarea
          rows="3"
          placeholder="Write message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* Resource Inputs */}
      <h3 className="text-xl font-semibold mb-3">Resources Required</h3>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Beds</label>
          <input
            type="number"
            value={resources.bed}
            onChange={(e) =>
              setResources({ ...resources, bed: Number(e.target.value) })
            }
            className="w-full border p-2 rounded-md mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Ventilators</label>
          <input
            type="number"
            value={resources.ventilator}
            onChange={(e) =>
              setResources({ ...resources, ventilator: Number(e.target.value) })
            }
            className="w-full border p-2 rounded-md mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Doctors</label>
          <input
            type="number"
            value={resources.doctor}
            onChange={(e) =>
              setResources({ ...resources, doctor: Number(e.target.value) })
            }
            className="w-full border p-2 rounded-md mt-1"
          />
        </div>
      </div>

      {/* Send Button */}
      <button
        onClick={sendReferral}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
};

export default SendReferral;
