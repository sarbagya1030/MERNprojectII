import React from "react";
import { Link, useParams } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

export default function PaymentSuccess() {
  const { userId, productId } = useParams();
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <FiCheckCircle size={64} className="text-green-500 mb-4 mx-auto" />
        <h1 className="text-4xl font-bold mb-4 text-green-700">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6">Thank you for your purchase.</p>
        <Link
          to="/dashboard"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Dashboard
        </Link>

        <div className="pt-7">
          <Link
            to={`/addreview/${productId}`}
            className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Add review
          </Link>
        </div>
      </div>
    </div>
  );
}
