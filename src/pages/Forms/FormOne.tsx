import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageIndicator from "./Components/PageIndicator";
import InputField from "./Components/InputField";

type FormData = {
  firstName: string;
  lastName: string;
  otherNames: string;
  dob: string;
  phone: string;
  whatsapp: string;
  email: string;
};

const FormOne: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    otherNames: "",
    dob: "",
    phone: "",
    whatsapp: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    console.log("Form Data:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="text-6xl font-bold text-[#002A6E] text-center mb-2">
        Register as a member
      </h2>
      <p className="text-gray-600 text-4xl text-center mb-4">Personal Information</p>

      {/* Page Indicator */}
      <div className="flex justify-center mb-6">
        <PageIndicator currentStep={0} totalSteps={3} />
      </div>

      {/* Form Fields */}
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />
          <InputField
            label="Other Name(s)"
            name="otherNames"
            value={formData.otherNames}
            onChange={handleChange}
            placeholder="Enter other name(s)"
          />
          <InputField
            label="Date of Birth"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="DD/MM/YYYY"
          />
          <InputField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          <InputField
            label="WhatsApp Number"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="Enter WhatsApp number"
          />
        </div>

        {/* Email full width */}
        <InputField
          label="Email Address (Optional)"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          type="email"
        />

        {/* Next Button */}
        <div className="text-right pt-4">
          <Link to="/formtwo">
            <button
              type="button"
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
      </form>
    </div>
  );
};

export default FormOne;
