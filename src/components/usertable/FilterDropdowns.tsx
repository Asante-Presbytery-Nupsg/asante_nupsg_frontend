import { Combobox } from "@/components/shared/combobox";

type FilterDropdownsProps = {
  selectedInstitution: string | undefined;
  selectedPresbytery: string | undefined;
  onInstitutionChange: (value: string | undefined) => void;
  onPresbyteryChange: (value: string | undefined) => void;
  institutionOptions: Array<{ value: string; label: string }>;
  presbyteryOptions: Array<{ value: string; label: string }>;
  onInstitutionSearch?: (search: string) => void;
  onPresbyterySearch?: (search: string) => void;
  isLoadingInstitutions?: boolean;
  isLoadingPresbyteries?: boolean;
};

export function FilterDropdowns({
  selectedInstitution,
  selectedPresbytery,
  onInstitutionChange,
  onPresbyteryChange,
  institutionOptions,
  presbyteryOptions,
  onInstitutionSearch,
  onPresbyterySearch,
  isLoadingInstitutions = false,
  isLoadingPresbyteries = false,
}: FilterDropdownsProps) {
  return (
    <div className="flex gap-2 flex-col min-[500px]:flex-row items-center w-full">
      <Combobox
        label=""
        value={selectedInstitution || ""}
        onChange={(val) => onInstitutionChange(val || undefined)}
        options={institutionOptions}
        placeholder="All Institutions"
        searchPlaceholder="Search institutions..."
        onSearch={onInstitutionSearch}
        isLoading={isLoadingInstitutions}
        className="rounded-xs w-full! md:w-64!"
        clearable
      />

      <Combobox
        label=""
        value={selectedPresbytery || ""}
        onChange={(val) => onPresbyteryChange(val || undefined)}
        options={presbyteryOptions}
        placeholder="All Presbyteries"
        searchPlaceholder="Search presbyteries..."
        onSearch={onPresbyterySearch}
        isLoading={isLoadingPresbyteries}
        className="rounded-xs w-full! md:w-64!"
        clearable
      />
    </div>
  );
}
