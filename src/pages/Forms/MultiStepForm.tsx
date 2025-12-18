import React, { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import PageIndicator from "./partials/PageIndicator";
import {
  MultiStepUserSchema,
  type MultiStepUserFormInput,
} from "@/schema/userSchema";
import SuccessPage from "./SuccessModal";
import { registerUser } from "@/api/auth.api";
import {
  getInstitutions,
  getPresbyteries,
  getProgrammes,
  getRegions,
} from "@/api/misc.api";
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

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [programmeSearch, setProgrammeSearch] = useState("");
  const [institutionSearch, setInstitutionSearch] = useState("");
  const [regionSearch, setRegionSearch] = useState("");
  const [presbyterySearch, setPresbyterySearch] = useState("");
  const [showCustomProgrammeInput, setShowCustomProgrammeInput] =
    useState(false);

  const [showCustomInstitutionInput, setShowCustomInstitutionInput] =
    useState(false);

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
      presbytery_id: "",
    },
  });

  const programmeValue = watch("programme_id");
  const institutionValue = watch("institution_id");
  const regionValue = watch("region_id");
  const presbyteryValue = watch("presbytery_id");

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

  const { data: presbyteryData, isLoading: isLoadingPresbyteries } = useQuery({
    queryKey: ["presbyteries"],
    queryFn: () =>
      getPresbyteries({
        pageIndex: 0,
        pageSize: 30,
        globalFilter: presbyterySearch,
      }),
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

  const presbyteryOptions = React.useMemo(() => {
    if (!presbyteryData?.presbyteries) return [];
    return presbyteryData.presbyteries.map((presbytery) => ({
      value: presbytery.id?.toString() || presbytery.name,
      label: presbytery.name,
    }));
  }, [presbyteryData]);

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

        <div className="flex justify-center mb-9 mt-4">
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
              <Input
                label="Hall/Hostel(if any)"
                register={register("residence")}
                error={errors.residence}
                placeholder="Enter hall/hostel name"
                className="h-10"
              />

              <Input
                label="High School Attended"
                register={register("high_school", {
                  required: "High school is required",
                })}
                error={errors.high_school}
                placeholder="eg. St Pauls Senior High School"
                className="h-10"
              />

              {/* Programme Combobox */}
              <Combobox
                label="Programme"
                value={programmeValue || ""}
                onChange={(val) => {
                  // Set the form value
                  setValue("programme_id", val || "", { shouldValidate: true });

                  if (val) {
                    setShowCustomProgrammeInput(false);
                    setValue("programme_name", "");
                  } else {
                    setShowCustomProgrammeInput(true);
                  }
                }}
                options={programmeOptions}
                placeholder="Select programme"
                searchPlaceholder="Search programmes..."
                error={errors.programme_id}
                onSearch={setProgrammeSearch}
                isLoading={isLoadingProgrammes}
                clearable={true}
              />
              {/* Institution Combobox */}
              <Combobox
                label="Tertiary School Attended"
                value={institutionValue || ""}
                onChange={(val) =>
                  setValue("institution_id", val, { shouldValidate: true })
                }
                options={institutionOptions}
                placeholder="Select tertiary school"
                searchPlaceholder="Search schools..."
                error={errors.institution_id}
                onSearch={setInstitutionSearch}
                isLoading={isLoadingInstitutions}
                clearable
              />

              {/* Link to enter custom programme if none selected */}
              {!watch("programme_id") && !showCustomProgrammeInput && (
                <div className="flex items-center mt-1 col-span-1">
                  <button
                    type="button"
                    className="text-blue-700 text-sm hover:underline"
                    onClick={() => setShowCustomProgrammeInput(true)}
                  >
                    Can't find programme? Click here
                  </button>
                </div>
              )}

              {!watch("institution_id") && !showCustomInstitutionInput && (
                <div className="flex items-center mt-1">
                  <button
                    type="button"
                    className="text-blue-700 text-sm hover:underline"
                    onClick={() => setShowCustomInstitutionInput(true)}
                  >
                    Can't find institution? Click here
                  </button>
                </div>
              )}

              {/* Custom institution input */}
              {showCustomInstitutionInput && !watch("institution_id") && (
                <div className="col-span-full">
                  <Input
                    label="Enter Institution Name(if not selecting from list)"
                    register={register("institution_name", {
                      required:
                        "Please enter institution name if not selecting from list",
                    })}
                    error={errors.institution_name}
                    placeholder="Enter your institution name"
                    className="h-10"
                  />
                </div>
              )}

              {/* Custom programme input */}
              {showCustomProgrammeInput && !watch("programme_id") && (
                <div className="col-span-full">
                  <Input
                    label="Enter Programme Name (if not selecting from list)"
                    register={register("programme_name", {
                      required:
                        "Please enter programme name if not selecting from list",
                    })}
                    error={errors.programme_name}
                    placeholder="Enter your programme name"
                    className="h-10"
                  />
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                className="h-10"
                label="Local Congregation"
                name="congregation"
                register={register("congregation", {
                  required: "Congregation is required",
                })}
                error={errors.congregation}
                placeholder="eg. Christ Congregation"
              />

              <Combobox
                label="Church Region"
                value={regionValue}
                onChange={(val) =>
                  setValue("region_id", val, { shouldValidate: true })
                }
                options={regionOptions}
                placeholder="Select church region"
                searchPlaceholder="Search regions..."
                error={errors.region_id}
                onSearch={setRegionSearch}
                isLoading={isLoadingRegions}
              />
              <Input
                label="Church District"
                name="district_church"
                register={register("district_church", {
                  required: "District is required",
                })}
                error={errors.district_church}
                placeholder="Enter district"
              />
              <Combobox
                label="Presbytery"
                value={presbyteryValue}
                onChange={(val) =>
                  setValue("presbytery_id", val, { shouldValidate: true })
                }
                options={presbyteryOptions}
                placeholder="Select presbtery"
                searchPlaceholder="Search presbtery..."
                error={errors.presbytery_id}
                onSearch={setPresbyterySearch}
                isLoading={isLoadingPresbyteries}
              />
              <Input
                label="Guardian/Parent Name"
                name="guardian_name"
                register={register("guardian_name", {
                  required: "Guardian name is required",
                })}
                error={errors.guardian_name}
                placeholder="Enter guardian name"
              />
              <Input
                label="Guardian/Parent Contact"
                name="guardian_contact"
                register={register("guardian_contact", {
                  required: "Guardian contact is required",
                })}
                error={errors.guardian_contact}
                placeholder="eg. +233123456789"
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
                className="ml-auto inline-flex items-center px-8 py-2 cursor-pointer tracking-wide bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto inline-flex items-center cursor-pointer px-8 py-2 tracking-wide bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
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
