import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/shared/combobox";
import { getInstitutions, getProgrammes } from "@/api/misc.api";
import type { MultiStepUserFormInput } from "@/schema/userSchema";

interface EducationStepProps {
  formMethods: UseFormReturn<MultiStepUserFormInput>;
}

const EducationStep: React.FC<EducationStepProps> = ({ formMethods }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = formMethods;

  const [programmeSearch, setProgrammeSearch] = useState("");
  const [institutionSearch, setInstitutionSearch] = useState("");
  const [showCustomProgrammeInput, setShowCustomProgrammeInput] =
    useState(false);
  const [showCustomInstitutionInput, setShowCustomInstitutionInput] =
    useState(false);

  const programmeValue = watch("programme_id");
  const institutionValue = watch("institution_id");

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

  const programmeOptions = useMemo(() => {
    if (!programmesData?.programmes) return [];
    return programmesData.programmes.map((prog) => ({
      value: prog.id?.toString() || prog.name,
      label: prog.name,
    }));
  }, [programmesData]);

  const institutionOptions = useMemo(() => {
    if (!institutionsData?.institutions) return [];
    return institutionsData.institutions.map((institution) => ({
      value: institution.id?.toString() || institution.name,
      label: institution.name,
    }));
  }, [institutionsData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        label="Hall/Hostel (or Place of residence on campus)"
        register={register("residence")}
        error={errors.residence}
        placeholder="Enter hall/hostel name"
        className="h-10"
      />

      <Input
        label="High School Attended(In Full)"
        register={register("high_school")}
        error={errors.high_school}
        placeholder="eg. St Pauls Senior High School"
        className="h-10"
      />

      <div className="col-span-1">
        <Combobox
          label="Programme"
          value={programmeValue || ""}
          onChange={(val) => {
            if (val) {
              setValue("programme_id", val, { shouldValidate: true });
              setValue("programme_name", "", { shouldValidate: true });
              setShowCustomProgrammeInput(false);
            } else {
              setValue("programme_id", "", { shouldValidate: true });
              setValue("programme_name", "", { shouldValidate: true });
              setShowCustomProgrammeInput(true);
            }
          }}
          options={programmeOptions}
          placeholder="Select programme"
          searchPlaceholder="Search programmes..."
          error={errors.programme_id || errors.programme_name}
          onSearch={setProgrammeSearch}
          isLoading={isLoadingProgrammes}
          clearable
        />
      </div>

      <div className="col-span-1">
        <Combobox
          label="Tertiary School Attended"
          value={institutionValue || ""}
          onChange={(val) => {
            if (val) {
              setValue("institution_id", val, { shouldValidate: true });
              setValue("institution_name", "", { shouldValidate: true });
              setShowCustomInstitutionInput(false);
            } else {
              setValue("institution_id", "", { shouldValidate: true });
              setValue("institution_name", "", { shouldValidate: true });
              setShowCustomInstitutionInput(true);
            }
          }}
          options={institutionOptions}
          placeholder="Select tertiary school"
          searchPlaceholder="Search schools..."
          error={errors.institution_id || errors.institution_name}
          onSearch={setInstitutionSearch}
          isLoading={isLoadingInstitutions}
          clearable
        />
      </div>

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
        <div className="flex items-center mt-1 col-span-1">
          <button
            type="button"
            className="text-blue-700 text-sm hover:underline"
            onClick={() => setShowCustomInstitutionInput(true)}
          >
            Can't find institution? Click here
          </button>
        </div>
      )}

      {showCustomProgrammeInput && !watch("programme_id") && (
        <div className="col-span-full">
          <Input
            label="Enter Programme Name (if not selecting from list)"
            register={register("programme_name")}
            error={errors.programme_name}
            placeholder="Enter your programme name"
            className="h-10"
          />
        </div>
      )}

      {showCustomInstitutionInput && !watch("institution_id") && (
        <div className="col-span-full">
          <Input
            label="Enter Institution Name (if not selecting from list)"
            register={register("institution_name")}
            error={errors.institution_name}
            placeholder="Enter your institution name"
            className="h-10"
          />
        </div>
      )}
    </div>
  );
};

export default EducationStep;
