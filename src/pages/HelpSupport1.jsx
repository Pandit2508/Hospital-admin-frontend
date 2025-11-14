"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { ChevronDown } from "lucide-react"

export default function HelpSupport() {
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const faqs = [
    {
      id: 1,
      question: "How do I update bed availability?",
      answer:
        "Go to Resource Management > Bed Management and update the occupied beds count. The available beds will automatically calculate.",
    },
    {
      id: 2,
      question: "How do I refer a patient to another hospital?",
      answer:
        'Navigate to Hospital Network, find the hospital with available resources, and click "Refer Patient". Fill in the patient details and submit.',
    },
    {
      id: 3,
      question: "What does the critical alert mean?",
      answer:
        "Critical alerts indicate urgent situations like low blood stock or high occupancy. Check the Notification Center for details and take immediate action.",
    },
    {
      id: 4,
      question: "How do I generate a report?",
      answer:
        'Go to Reports & Analytics, select the time period, and click "Export as PDF" or "Export as CSV" to download your report.',
    },
    {
      id: 5,
      question: "Can I manage multiple admin accounts?",
      answer:
        'Yes, go to Profile Settings and select "Manage Sub-accounts" to add or remove additional admin users for your hospital.',
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ subject, message })
    alert("Your support request has been submitted!")
    setSubject("")
    setMessage("")
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Get help with using the dashboard</p>
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="font-medium text-gray-900 dark:text-white text-left">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${
                    expandedFaq === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedFaq === faq.id && (
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Technical Support</CardTitle>
          <CardDescription>Get help from our support team</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <Input
                placeholder="Describe your issue"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <Textarea
                placeholder="Provide details about your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Submit Support Request
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-gray-700 dark:text-gray-300">
          <div>
            <p className="text-sm font-medium">Email Support</p>
            <p className="text-gray-600 dark:text-gray-400">support@carepulse.com</p>
          </div>
          <div>
            <p className="text-sm font-medium">Phone Support</p>
            <p className="text-gray-600 dark:text-gray-400">+1-800-CARE-PULSE (1-800-227-3785)</p>
          </div>
          <div>
            <p className="text-sm font-medium">Support Hours</p>
            <p className="text-gray-600 dark:text-gray-400">24/7 Available</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
