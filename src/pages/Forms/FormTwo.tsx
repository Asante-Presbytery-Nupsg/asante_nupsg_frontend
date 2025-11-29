import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageIndicator from "./Components/PageIndicator";

type EducationData = {
  program: string;
  institution: string;
  district: string;
  highSchool: string;
};

const FormTwo: React.FC = () => {
  const [formData, setFormData] = useState<EducationData>({
    program: "",
    institution: "",
    district: "",
    highSchool: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    console.log("Next step:", formData);
    // navigation handled by Link below
  };

  const handleBack = () => {
    console.log("Go back");
    navigate("/formone"); // navigate back to FormOne
  };

  return (
    <div className="max-w-2xl my-20 mx-auto  p-8 bg-white rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="text-6xl font-bold text-[#002A6E] text-center mb-2">
        Register as a member
      </h2>
      <p className="text-gray-600 text-4xl text-center mb-4">
        Educational Background
      </p>

      {/* Page Indicator — placed below titles */}
      <div className="flex justify-center mb-6">
        <PageIndicator currentStep={1} totalSteps={3} />
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Program of Study
          </label>
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            placeholder="Enter your program"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tertiary School Attending
          </label>
          <select
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">––Select your institution––</option>
            <option value="University of Ghana">University of Ghana</option>
            <option value="KNUST">KNUST</option>
            <option value="UCC">UCC</option>
            <option value="UDS">UDS</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            District
          </label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="Enter your district"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            High School Attended
          </label>
          <input
            type="text"
            name="highSchool"
            value={formData.highSchool}
            onChange={handleChange}
            placeholder="Enter high school attended"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={handleBack}
          className="inline-flex items-center px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <Link to="/formthree">
          <button
            onClick={handleNext}
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Next
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FormTwo;
