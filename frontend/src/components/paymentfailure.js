// src/components/PaymentFailure.js
import React from "react";
import { Link } from "react-router-dom";
import { FiXCircle } from "react-icons/fi";

export default function PaymentFailure() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <FiXCircle size={64} className="text-red-500 mb-4 mx-auto" />
        <h1 className="text-4xl font-bold mb-4 text-red-700">Payment Failed</h1>
        <p className="text-gray-700 mb-6">
          Something went wrong with your payment. Please try again.
        </p>
        <Link
          to="/buy"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
