"use client"

import { Card, CardContent } from "../components/ui/card"
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"
import React from "react"

export default function NotificationCenter() {
  const notifications = [
    {
      id: 1,
      type: "critical",
      title: "Critical Blood Stock Alert",
      message: "AB- blood group stock is critically low (10 units). Immediate replenishment required.",
      time: "5 minutes ago",
      icon: AlertCircle,
    },
    {
      id: 2,
      type: "referral",
      title: "Patient Referral Received",
      message: "City General Hospital has referred a patient requiring ICU bed. Please confirm availability.",
      time: "15 minutes ago",
      icon: Info,
    },
    {
      id: 3,
      type: "warning",
      title: "High ICU Occupancy",
      message: "ICU occupancy has reached 84%. Consider patient transfers to other facilities.",
      time: "1 hour ago",
      icon: AlertTriangle,
    },
    {
      id: 4,
      type: "info",
      title: "Resource Replenishment",
      message: "Oxygen cylinders have been successfully refilled. 150 units added to inventory.",
      time: "2 hours ago",
      icon: CheckCircle,
    },
    {
      id: 5,
      type: "info",
      title: "System Maintenance",
      message: "Scheduled maintenance completed successfully. All systems operational.",
      time: "3 hours ago",
      icon: CheckCircle,
    },
  ]

  const getTypeStyles = (type) => {
    switch (type) {
      case "critical":
        return "bg-red-50 border-l-4 border-red-500"
      case "warning":
        return "bg-orange-50 border-l-4 border-orange-500"
      case "referral":
        return "bg-blue-50 border-l-4 border-blue-500"
      default:
        return "bg-green-50 border-l-4 border-green-500"
    }
  }

  const getIconColor = (type) => {
    switch (type) {
      case "critical":
        return "text-red-600"
      case "warning":
        return "text-orange-600"
      case "referral":
        return "text-blue-600"
      default:
        return "text-green-600"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notification Center</h1>
        <p className="text-gray-600 mt-1">View all alerts and notifications</p>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          const IconComponent = notification.icon
          return (
            <Card key={notification.id} className={`${getTypeStyles(notification.type)} border-0`}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <IconComponent className={`w-6 h-6 flex-shrink-0 ${getIconColor(notification.type)}`} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                    <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
