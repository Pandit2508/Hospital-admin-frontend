import React from "react";

const RequestCard = ({ request, onApprove, onReject }) => {
  return (
    <div className="p-5 rounded-2xl shadow-md border bg-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Booking Request from: <span className="text-blue-600">{request.from}</span>
      </h3>
      <p className="text-gray-600 mb-1">
        <strong>Requested Hospital:</strong> {request.to}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Type:</strong> {request.type}
      </p>
      <p className="text-gray-600 mb-3">
        <strong>Details:</strong> {request.details || "N/A"}
      </p>

      <div className="flex gap-3 mt-3">
        <button
          onClick={() => onApprove(request.id)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Approve
        </button>
        <button
          onClick={() => onReject(request.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
