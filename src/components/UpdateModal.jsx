import React, { useState } from "react";

const UpdateModal = ({ onClose, onSave, data }) => {
  const [beds, setBeds] = useState(data.beds);
  const [specialists, setSpecialists] = useState(data.specialists.join(", "));

  const handleSave = () => {
    onSave({
      ...data,
      beds: parseInt(beds),
      specialists: specialists.split(",").map((s) => s.trim()),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Update Availability</h2>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Beds:
        </label>
        <input
          type="number"
          className="border w-full p-2 rounded-md mb-4"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specialists (comma separated):
        </label>
        <input
          type="text"
          className="border w-full p-2 rounded-md mb-4"
          value={specialists}
          onChange={(e) => setSpecialists(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
