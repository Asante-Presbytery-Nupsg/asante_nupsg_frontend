import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageIndicator from "./Components/PageIndicator";

type ChurchData = {
  congregation: string;
  region: string;
  district: string;
  presbytery: string;
  guardianName: string;
  guardianContact: string;
};

const FormThree: React.FC = () => {
  const [formData, setFormData] = useState<ChurchData>({
    congregation: "",
    region: "",
    district: "",
    presbytery: "",
    guardianName: "",
    guardianContact: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinish = () => {
    console.log("Final submission:", formData);
    // navigation handled by Link below
  };

  const handleBack = () => {
    console.log("Go back to previous step");
    navigate("/formtwo"); // navigate back to FormTwo
  };

  return (
    <div className="max-w-2xl mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="text-6xl font-bold text-[#002A6E] text-center mb-2">
        Register as a member
      </h2>
      <p className="text-gray-600 text-4xl text-center mb-4">
        Church & Family Details
      </p>

      {/* Page Indicator — placed below titles */}
      <div className="flex justify-center mb-6">
        <PageIndicator currentStep={2} totalSteps={3} />
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Local Congregation
          </label>
          <input
            type="text"
            name="congregation"
            value={formData.congregation}
            onChange={handleChange}
            placeholder="Enter your local congregation"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Church Region
          </label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">---Select region---</option>
            <option value="Greater Accra">Greater Accra</option>
            <option value="Ashanti">Ashanti</option>
            <option value="Central">Central</option>
            <option value="Volta">Volta</option>
            <option value="Northern">Northern</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Church District
          </label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="Enter church district"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Presbytery Name
          </label>
          <input
            type="text"
            name="presbytery"
            value={formData.presbytery}
            onChange={handleChange}
            placeholder="Enter presbytery name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Guardian/Parent Name
          </label>
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            placeholder="Enter guardian/parent name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Guardian/Parent's Contact
          </label>
          <input
            type="text"
            name="guardianContact"
            value={formData.guardianContact}
            onChange={handleChange}
            placeholder="Enter guardian/parent's contact"
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

        <Link to="/success">
          <button
            onClick={handleFinish}
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Finish
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

export default FormThree;
