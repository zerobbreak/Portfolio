"use client"

import type React from "react"

import { useState } from "react"
// import { Send } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full">
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-400 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-gray-900 border border-gray-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-400 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-gray-900 border border-gray-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-400 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full bg-gray-900 border border-gray-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        {/* <Send size={18} /> */}
      </button>

      {submitStatus === "success" && (
        <div className="mt-4 p-3 bg-emerald-900/50 border border-emerald-500 text-emerald-300 rounded-md">
          Message sent successfully! I'll get back to you soon.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-500 text-red-300 rounded-md">
          Something went wrong. Please try again later.
        </div>
      )}
    </form>
  )
}

