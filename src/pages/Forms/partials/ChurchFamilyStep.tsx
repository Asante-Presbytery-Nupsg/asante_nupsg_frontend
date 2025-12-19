import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/shared/combobox";
import { getPresbyteries, getRegions } from "@/api/misc.api";
import type { MultiStepUserFormInput } from "@/schema/userSchema";

interface ChurchFamilyStepProps {
  formMethods: UseFormReturn<MultiStepUserFormInput>;
}

const ChurchFamilyStep: React.FC<ChurchFamilyStepProps> = ({ formMethods }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = formMethods;

  const [regionSearch, setRegionSearch] = useState("");
  const [presbyterySearch, setPresbyterySearch] = useState("");

  const regionValue = watch("region_id");
  const presbyteryValue = watch("presbytery_id");

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

  const regionOptions = useMemo(() => {
    if (!regionsData?.regions) return [];
    return regionsData.regions.map((region) => ({
      value: region.id?.toString() || region.name,
      label: region.name,
    }));
  }, [regionsData]);

  const presbyteryOptions = useMemo(() => {
    if (!presbyteryData?.presbyteries) return [];
    return presbyteryData.presbyteries.map((presbytery) => ({
      value: presbytery.id?.toString() || presbytery.name,
      label: presbytery.name,
    }));
  }, [presbyteryData]);

  return (
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
        onChange={(val) => setValue("region_id", val, { shouldValidate: true })}
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
  );
};

export default ChurchFamilyStep;
