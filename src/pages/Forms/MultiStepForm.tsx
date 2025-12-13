import React, { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import InputField from "./partials/InputField";
import PageIndicator from "./partials/PageIndicator";
import {
  MultiStepUserSchema,
  type MultiStepUserFormInput,
} from "@/schema/userSchema";
import SuccessPage from "./SuccessModal";
import { registerUser } from "@/api/auth.api";
import { getInstitutions, getProgrammes, getRegions } from "@/api/misc.api";
import { Combobox } from "@/components/shared/combobox";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/shared/date_of_birth";

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
  ["programme_id", "institution_id", "district_institution", "high_school"],
  [
    "congregation",
    "region_id",
    "district_church",
    "presbytery",
    "guardian_name",
    "guardian_contact",
  ],
];

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [programmeSearch, setProgrammeSearch] = useState("");
  const [institutionSearch, setInstitutionSearch] = useState("");
  const [regionSearch, setRegionSearch] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<MultiStepUserFormInput>({
    resolver: zodResolver(MultiStepUserSchema),
    mode: "onBlur",
    defaultValues: {
      dob: undefined,
      programme_id: "",
      institution_id: "",
      region_id: "",
    },
  });

  const programmeValue = watch("programme_id");
  const institutionValue = watch("institution_id");
  const regionValue = watch("region_id");

  // Fetch initial programmes (loads 30 upfront)
  const { data: programmesData, isLoading: isLoadingProgrammes } = useQuery({
    queryKey: ["programmes", programmeSearch],
    queryFn: () =>
      getProgrammes({
        pageIndex: 0,
        pageSize: 30,
        globalFilter: programmeSearch,
      }),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

  // Fetch initial institutions (loads 30 upfront)
  const { data: institutionsData, isLoading: isLoadingInstitutions } = useQuery(
    {
      queryKey: ["institutions", institutionSearch],
      queryFn: () =>
        getInstitutions({
          pageIndex: 0,
          pageSize: 30,
          globalFilter: institutionSearch,
        }),
      staleTime: 5 * 60 * 1000,
      placeholderData: (previousData) => previousData,
    }
  );

  const { data: regionsData, isLoading: isLoadingRegions } = useQuery({
    queryKey: ["regions"],
    queryFn: () =>
      getRegions({ pageIndex: 0, pageSize: 30, globalFilter: regionSearch }),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

  // Transform API data to combobox format
  const programmeOptions = React.useMemo(() => {
    if (!programmesData?.programmes) return [];
    return programmesData.programmes.map((prog) => ({
      value: prog.id?.toString() || prog.name,
      label: prog.name,
    }));
  }, [programmesData]);

  const institutionOptions = React.useMemo(() => {
    if (!institutionsData?.institutions) return [];
    return institutionsData.institutions.map((institution) => ({
      value: institution.id?.toString() || institution.name,
      label: institution.name,
    }));
  }, [institutionsData]);

  const regionOptions = React.useMemo(() => {
    if (!regionsData?.regions) return [];
    return regionsData.regions.map((region) => ({
      value: region.id?.toString() || region.name,
      label: region.name,
    }));
  }, [regionsData]);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = await trigger(stepFields[step]);
    if (valid) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const onSubmit: SubmitHandler<MultiStepUserFormInput> = async (data) => {
    data.email = data.email?.trim();

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
      <div className="max-w-2xl mx-auto my-14 md:my-20 py-12 px-5 sm:py-8 sm:px-8 bg-white rounded-lg shadow-sm border border-gray-200">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
              <Input
                label="First Name"
                register={register("first_name", {
                  required: "First name is required",
                })}
                error={errors.first_name}
                placeholder="Enter first name"
                className="h-10"
              />

              <Input
                label="Last Name"
                register={register("last_name", {
                  required: "Last name is required",
                })}
                error={errors.last_name}
                placeholder="Enter last name"
                className="h-10"
              />

              <Input
                label="Other Name(s)"
                register={register("other_name")}
                error={errors.other_name}
                placeholder="Enter other names"
                className="h-10"
              />

              <Input
                label="Phone Number"
                register={register("phone", {
                  required: "Phone number is required",
                })}
                error={errors.phone}
                placeholder="Enter phone number"
                className="h-10"
              />

              <Controller
                control={control}
                name="dob"
                rules={{ required: "Date of birth is required" }}
                render={({ field }) => (
                  <DatePicker
                    label="Date of Birth"
                    placeholder="Select your date of birth"
                    value={field.value as Date | null}
                    onChange={field.onChange}
                    error={errors.dob}
                  />
                )}
              />

              <Input
                label="WhatsApp Number(Optional)"
                register={register("whatsapp")}
                error={errors.whatsapp}
                placeholder="Enter whatsapp number"
                className="h-10"
              />

              <div className="col-span-full">
                <Input
                  label="Email Address (optional)"
                  register={register("email")}
                  error={errors.email}
                  placeholder="Enter email address"
                  className="h-10"
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Combobox
                label="Programme"
                value={programmeValue}
                onChange={(val) =>
                  setValue("programme_id", val, { shouldValidate: true })
                }
                options={programmeOptions}
                placeholder="Select programme"
                searchPlaceholder="Search programmes..."
                error={errors.programme_id}
                onSearch={setProgrammeSearch}
                isLoading={isLoadingProgrammes}
              />

              <Combobox
                label="Tertiary School Attended"
                value={institutionValue}
                onChange={(val) =>
                  setValue("institution_id", val, { shouldValidate: true })
                }
                options={institutionOptions}
                placeholder="Select tertiary school"
                searchPlaceholder="Search schools..."
                error={errors.institution_id}
                onSearch={setInstitutionSearch}
                isLoading={isLoadingInstitutions}
              />

              <Input
                label="District"
                register={register("district_institution", {
                  required: "District is required",
                })}
                error={errors.district_institution}
                placeholder="Enter district"
                className="h-10"
              />

              <Input
                label="High School Attended"
                register={register("high_school", {
                  required: "High school is required",
                })}
                error={errors.high_school}
                placeholder="Enter high school attended"
                className="h-10"
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

              <Combobox
                label="Church Region"
                value={regionValue}
                onChange={(val) =>
                  setValue("region_id", val, { shouldValidate: true })
                }
                options={regionOptions}
                placeholder="Select tertiary school"
                searchPlaceholder="Search schools..."
                error={errors.region_id}
                onSearch={setRegionSearch}
                isLoading={isLoadingRegions}
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
