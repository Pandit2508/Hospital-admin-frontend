"use client";

import { Card, CardContent } from "../components/ui/card";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const hospitalId = localStorage.getItem("hospitalID");
  const navigate = useNavigate();

  useEffect(() => {
    if (!hospitalId) return;

    const q = query(
      collection(db, "notifications"),
      where("hospitalId", "==", hospitalId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort by time desc
      list.sort((a, b) => b.timestamp - a.timestamp);

      setNotifications(list);
    });

    return () => unsubscribe();
  }, [hospitalId]);

  const getTypeStyles = (type) => {
    switch (type) {
      case "critical":
        return "bg-red-50 border-l-4 border-red-500";
      case "warning":
        return "bg-orange-50 border-l-4 border-orange-500";
      case "referral-request":
        return "bg-blue-50 border-l-4 border-blue-500";
      case "referral-status-update":
        return "bg-blue-50 border-l-4 border-blue-500";
      default:
        return "bg-green-50 border-l-4 border-green-500";
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case "critical":
        return "text-red-600";
      case "warning":
        return "text-orange-600";
      case "referral-request":
        return "text-blue-600";
      case "referral-status-update":
        return "text-blue-600";
      default:
        return "text-green-600";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "critical":
        return AlertCircle;
      case "warning":
        return AlertTriangle;
      case "referral-request":
        return Info;
      case "referral-status-update":
        return CheckCircle;
      default:
        return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notification Center</h1>
        <p className="text-gray-600 mt-1">View all alerts and notifications</p>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 && (
          <p className="text-gray-600 text-center mt-10">No notifications yet.</p>
        )}

        {notifications.map((notification) => {
          const IconComponent = getIcon(notification.type);

          return (
            <Card
              key={notification.id}
              className={`${getTypeStyles(notification.type)} border-0 cursor-pointer`}
              onClick={() => {
                if (notification.type === "referral-request") {
                  navigate(`/referral/${notification.referralId}`);
                }
              }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <IconComponent
                    className={`w-6 h-6 flex-shrink-0 ${getIconColor(notification.type)}`}
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {notification.title || "Notification"}
                    </h3>

                    <p className="text-sm text-gray-700 mt-1">
                      {notification.message}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      {notification.timestamp?.toDate
                        ? notification.timestamp.toDate().toLocaleString()
                        : ""}
                    </p>

                    {notification.type === "referral-status-update" && (
                      <p className="text-sm mt-2 font-semibold text-blue-700">
                        Referral Status: {notification.status}
                      </p>
                    )}
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
