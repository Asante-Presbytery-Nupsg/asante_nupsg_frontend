import React, { useState } from "react";
import { useForm, type FieldError, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./Components/InputField";
import PageIndicator from "./Components/PageIndicator";
import {
  MultiStepUserSchema,
  type MultiStepUserFormInput,
} from "@/schema/userSchema";
import SuccessPage from "./SuccessModal";
import { registerUser } from "@/api/auth.api";

// Fields per step
const stepFields: Array<Array<keyof MultiStepUserFormInput>> = [
  [
    "first_name",
    "last_name",
    "other_name",
    "email",
    "phone",
    "whatsapp",
    "dob",
  ],
  ["programme", "institution", "district_institution", "high_school"],
  [
    "congregation",
    "region",
    "district_church",
    "presbytery",
    "guardian_name",
    "guardian_contact",
  ],
];

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<MultiStepUserFormInput>({
    resolver: zodResolver(MultiStepUserSchema),
    mode: "onBlur",
  });

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = await trigger(stepFields[step]);
    if (valid) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const onSubmit: SubmitHandler<MultiStepUserFormInput> = async (data) => {
    // console.log("Final submission:", data);

    // Trim email safely
    data.email = data.email?.trim();

    try {
      const response = await registerUser(data);
      // console.log("API Response:", response);
      if (response) {
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-3xl mx-auto my-14 md:my-20 py-12 px-5 sm:py-8 sm:px-8 bg-white rounded-lg shadow-sm border border-gray-200">
        {showSuccessModal && <SuccessPage isVisible={showSuccessModal} />}

        <h2 className="text-3xl md:text-4xl font-bold text-[#002A6E] text-center mb-2">
          Register as a member
        </h2>
        <p className="text-gray-600 text-xl md:text-2xl text-center mb-4">
          {step === 0
            ? "Personal Information"
            : step === 1
            ? "Educational Background"
            : "Church & Family Details"}
        </p>

        <div className="flex justify-center mb-6">
          <PageIndicator currentStep={step} totalSteps={3} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="first_name"
                register={register}
                error={errors.first_name}
                placeholder="Enter first name"
              />
              <InputField
                label="Last Name"
                name="last_name"
                register={register}
                error={errors.last_name}
                placeholder="Enter last name"
              />
              <InputField
                label="Other Name(s)"
                name="other_name"
                register={register}
                error={errors.other_name}
                placeholder="Enter other names"
              />
              <InputField
                label="Date of Birth"
                name="dob"
                register={register}
                error={errors.dob as FieldError | undefined}
                placeholder="DD/MM/YYYY"
                type="date"
              />
              <InputField
                label="Phone Number"
                name="phone"
                register={register}
                error={errors.phone}
                placeholder="Enter phone number"
              />
              <InputField
                label="WhatsApp Number"
                name="whatsapp"
                register={register}
                error={errors.whatsapp}
                placeholder="Enter WhatsApp number"
              />
              <div className="col-span-full">
                <InputField
                  label="Email Address (Optional)"
                  name="email"
                  register={register}
                  error={errors.email}
                  placeholder="Enter email"
                  type="email"
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Program of Study"
                name="programme"
                register={register}
                error={errors.programme}
                placeholder="Enter your program"
              />
              <InputField
                label="Tertiary School Attending"
                name="institution"
                register={register}
                error={errors.institution}
                placeholder="Enter institution"
              />
              <InputField
                label="District"
                name="district_institution"
                register={register}
                error={errors.district_institution}
                placeholder="Enter district"
              />
              <InputField
                label="High School Attended"
                name="high_school"
                register={register}
                error={errors.high_school}
                placeholder="Enter high school attended"
              />
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Local Congregation"
                name="congregation"
                register={register}
                error={errors.congregation}
                placeholder="Enter congregation"
              />
              <InputField
                label="Church Region"
                name="region"
                register={register}
                error={errors.region}
                placeholder="Enter region"
              />
              <InputField
                label="Church District"
                name="district_church"
                register={register}
                error={errors.district_church}
                placeholder="Enter district"
              />
              <InputField
                label="Presbytery Name"
                name="presbytery"
                register={register}
                error={errors.presbytery}
                placeholder="Enter presbytery"
              />
              <InputField
                label="Guardian/Parent Name"
                name="guardian_name"
                register={register}
                error={errors.guardian_name}
                placeholder="Enter guardian name"
              />
              <InputField
                label="Guardian/Parent Contact"
                name="guardian_contact"
                register={register}
                error={errors.guardian_contact}
                placeholder="Enter contact"
              />
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition"
              >
                Back
              </button>
            )}

            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto inline-flex items-center px-8 py-2 tracking-wide bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto inline-flex items-center px-8 py-2 tracking-wide bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
              >
                Finish
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
