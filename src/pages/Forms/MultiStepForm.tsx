import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageIndicator from "./partials/PageIndicator";
import {
  MultiStepUserSchema,
  type MultiStepUserFormInput,
} from "@/schema/userSchema";
import SuccessPage from "./SuccessModal";
import { registerUser } from "@/api/auth.api";
import FormNavigation from "./partials/FormNavigation";
import PersonalInfoStep from "./partials/PersonalInfo";
import EducationStep from "./partials/EducationStep";
import ChurchFamilyStep from "./partials/ChurchFamilyStep";

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
  [
    "programme_id",
    "institution_id",
    "programme_name",
    "institution_name",
    "residence",
    "high_school",
  ],
  [
    "congregation",
    "region_id",
    "district_church",
    "presbytery_id",
    "guardian_name",
    "guardian_contact",
  ],
];

const stepTitles = [
  "Personal Information",
  "Educational Background",
  "Church & Family Details",
];

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formMethods = useForm<MultiStepUserFormInput>({
    resolver: zodResolver(MultiStepUserSchema),
    mode: "onChange",
    defaultValues: {
      dob: undefined,
      programme_id: "",
      institution_id: "",
      region_id: "",
      presbytery_id: "",
      programme_name: "",
      institution_name: "",
    },
  });

  const {
    handleSubmit,
    trigger,
    getValues,
    setError,
    clearErrors,
    formState: { isSubmitting },
  } = formMethods;

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    // Special validation for education step
    if (step === 1) {
      const values = getValues();
      const progId = (values.programme_id || "").trim();
      const progName = (values.programme_name || "").trim();
      const instId = (values.institution_id || "").trim();
      const instName = (values.institution_name || "").trim();

      const hasProgramme = progId.length > 0 || progName.length > 0;
      const hasInstitution = instId.length > 0 || instName.length > 0;

      clearErrors([
        "programme_id",
        "programme_name",
        "institution_id",
        "institution_name",
      ]);

      let hasErrors = false;
      if (!hasProgramme) {
        setError("programme_name", {
          type: "manual",
          message: "Please select or enter a programme",
        });
        hasErrors = true;
      }
      if (!hasInstitution) {
        setError("institution_name", {
          type: "manual",
          message: "Please select or enter an institution",
        });
        hasErrors = true;
      }
      if (hasErrors) return;
    }

    const valid = await trigger(stepFields[step]);
    if (!valid) return;

    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const onSubmit: SubmitHandler<MultiStepUserFormInput> = async (data) => {
    data.email = data.email?.trim();
    if (data.dob === undefined) data.dob = "";
    try {
      const response = await registerUser(data);
      if (response) {
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto my-14 md:my-20 py-12 px-5 sm:py-8 sm:px-8 bg-white rounded-xs shadow-sm border border-gray-200">
        {showSuccessModal && <SuccessPage isVisible={showSuccessModal} />}

        <h2 className="text-3xl md:text-4xl font-bold text-[#002A6E] text-center mb-2">
          Register as a member
        </h2>
        <p className="text-gray-600 text-xl md:text-2xl text-center mb-4">
          {stepTitles[step]}
        </p>

        <div className="flex justify-center mb-9 mt-4">
          <PageIndicator currentStep={step} totalSteps={3} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 0 && <PersonalInfoStep formMethods={formMethods} />}
          {step === 1 && <EducationStep formMethods={formMethods} />}
          {step === 2 && <ChurchFamilyStep formMethods={formMethods} />}

          <FormNavigation
            step={step}
            totalSteps={3}
            onBack={handleBack}
            onNext={handleNext}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
