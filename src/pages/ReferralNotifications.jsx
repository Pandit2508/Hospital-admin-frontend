import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReferralNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const hospitalId = localStorage.getItem("hospitalID");
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      where("hospitalId", "==", hospitalId)
    );

    const unsub = onSnapshot(q, snapshot => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(list);
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>

      {notifications.map(n => (
        <div key={n.id}>
          <p>{n.message}</p>
          {n.type === "referral-request" && (
            <button onClick={() => navigate(`/referral/${n.referralId}`)}>
              View Referral
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReferralNotifications;
