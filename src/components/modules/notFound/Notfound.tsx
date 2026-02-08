'use client'
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <div className="p-8 bg-white rounded-2xl shadow-lg max-w-md w-full">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-4xl font-bold mb-2 text-gray-800">404</h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          Return Home
        </Link>
      </div>
      
    </div>
  )
}
