import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

const ReferralDetails = () => {
  const { referralId } = useParams();
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReferral = async () => {
      try {
        const ref = doc(db, "referrals", referralId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setReferral({ id: snap.id, ...snap.data() });
        }
      } finally {
        setLoading(false);
      }
    };

    loadReferral();
  }, [referralId]);

  const acceptReferral = async () => {
    if (!referral) return;

    await updateDoc(doc(db, "referrals", referralId), {
      status: "accepted",
    });

    await reserveResources();

    await addDoc(collection(db, "notifications"), {
      hospitalId: referral.fromHospitalId,
      type: "referral-status-update",
      referralId,
      message: "Your referral request was ACCEPTED",
      read: false,
      timestamp: new Date(),
    });

    alert("Referral accepted!");
  };

  const rejectReferral = async () => {
    if (!referral) return;

    await updateDoc(doc(db, "referrals", referralId), {
      status: "rejected",
    });

    await addDoc(collection(db, "notifications"), {
      hospitalId: referral.fromHospitalId,
      type: "referral-status-update",
      referralId,
      message: "Your referral request was REJECTED",
      read: false,
      timestamp: new Date(),
    });

    alert("Referral rejected!");
  };

  // 🔥 Auto-resource deduction from destination hospital
  const reserveResources = async () => {
    if (!referral) return;

    const res = referral.resourcesRequested;
    const hospitalId = referral.toHospitalId;

    const resRef = doc(
      db,
      "hospitals",
      hospitalId,
      "resources",
      "resourceInfo"
    );

    const snap = await getDoc(resRef);
    const current = snap.data();

    if (!current) return;

    await updateDoc(resRef, {
      beds: {
        total: current.beds.total,
        occupied: current.beds.occupied + (res.bed || 0),
      },
      icuBeds: {
        total: current.icuBeds.total,
        occupied: current.icuBeds.occupied + (res.icu || 0),
      },
      ventilators: {
        total: current.ventilators.total,
        occupied: current.ventilators.occupied + (res.ventilator || 0),
      },
    });
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!referral) return <p className="text-center text-red-500">Referral not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 rounded-lg shadow-md bg-white">

      <h2 className="text-2xl font-semibold">Referral Request Details</h2>

      <div className="space-y-2">
        <p>
          <strong>Message:</strong> {referral.message || "No message provided"}
        </p>

        <h3 className="text-lg font-semibold">Resources Requested</h3>

        <div className="grid grid-cols-3 gap-4">
          <p><strong>Beds:</strong> {referral.resourcesRequested.bed}</p>
          <p><strong>ICU Beds:</strong> {referral.resourcesRequested.icu}</p>
          <p><strong>Ventilators:</strong> {referral.resourcesRequested.ventilator}</p>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={acceptReferral}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Accept
        </button>

        <button
          onClick={rejectReferral}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
        >
          Reject
        </button>
      </div>

    </div>
  );
};

export default ReferralDetails;
