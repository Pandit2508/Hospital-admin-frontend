import React from "react";

const HospitalCard = ({ name, location, contact, beds, specialists, isOwn, onBook }) => {
  const handleUpdate = () => {
    alert(`Update availability for ${name}`);
  };

  return (
    <div className={`p-5 rounded-2xl shadow-md border bg-white ${isOwn ? "border-blue-500" : ""}`}>
      <h3 className="text-xl font-bold text-gray-800">{name}</h3>
      <p className="text-gray-600">{location}</p>
      <p className="text-gray-700 font-medium mt-2">Contact: {contact}</p>
      <p className="text-gray-700 mt-1">Available Beds: {beds}</p>
      <div className="flex flex-wrap mt-2 gap-2">
        {specialists.map((s, idx) => (
          <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {s}
          </span>
        ))}
      </div>

      {isOwn ? (
        <button
          onClick={handleUpdate}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Update Availability
        </button>
      ) : (
        <button
          onClick={onBook}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Book
        </button>
      )}
    </div>
  );
};

export default HospitalCard;
