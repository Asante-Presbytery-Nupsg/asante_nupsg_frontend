import React from "react";
import { Link } from "react-router-dom";

const SuccessPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Registration Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for registering as a member. Your information has been
          submitted successfully.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <Link to="/">
            <button className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
              Go to Home
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
