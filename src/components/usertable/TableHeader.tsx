import { type Table } from "@tanstack/react-table";
import { SearchInput } from "./SearchInput";
import { FilterDropdowns } from "./FilterDropdowns";
import { SelectionInfo } from "./SelectionInfo";
import { ColumnVisibilityDropdown } from "./ColumnVisibilityDropdown";
import { ExportButtons } from "./ExportButtons";

type TableHeaderProps<T> = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedInstitution: string | undefined;
  selectedPresbytery: string | undefined;
  onInstitutionChange: (value: string | undefined) => void;
  onPresbyteryChange: (value: string | undefined) => void;
  institutionOptions: Array<{ value: string; label: string }>;
  presbyteryOptions: Array<{ value: string; label: string }>;
  selectedCount: number;
  onClearSelection: () => void;
  table: Table<T>;
  onToggleColumn: (columnId: string) => void;
  onExportCSV: () => void;
  onExportExcel: () => void;
  isExporting: boolean;
  onInstitutionSearch?: (search: string) => void;
  onPresbyterySearch?: (search: string) => void;
  isLoadingInstitutions?: boolean;
  isLoadingPresbyteries?: boolean;
};

export function TableHeader<T>({
  searchQuery,
  onSearchChange,
  selectedInstitution,
  selectedPresbytery,
  onInstitutionChange,
  onPresbyteryChange,
  institutionOptions,
  presbyteryOptions,
  selectedCount,
  onClearSelection,
  table,
  onToggleColumn,
  onExportCSV,
  onExportExcel,
  isExporting,
  onInstitutionSearch,
  onPresbyterySearch,
  isLoadingInstitutions,
  isLoadingPresbyteries,
}: TableHeaderProps<T>) {
  return (
    <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row">
      {/* Search and Filters */}
      <div className="flex items-start gap-2 w-full sm:w-96 flex-col">
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search users..."
        />

        <FilterDropdowns
          selectedInstitution={selectedInstitution}
          selectedPresbytery={selectedPresbytery}
          onInstitutionChange={onInstitutionChange}
          onPresbyteryChange={onPresbyteryChange}
          institutionOptions={institutionOptions}
          presbyteryOptions={presbyteryOptions}
          onInstitutionSearch={onInstitutionSearch}
          onPresbyterySearch={onPresbyterySearch}
          isLoadingInstitutions={isLoadingInstitutions}
          isLoadingPresbyteries={isLoadingPresbyteries}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4 mt-3 md:mt-0">
        <SelectionInfo
          selectedCount={selectedCount}
          onClear={onClearSelection}
        />

        <div className="flex gap-2 items-center">
          <ColumnVisibilityDropdown
            table={table}
            onToggleColumn={onToggleColumn}
          />
          <ExportButtons
            onExportCSV={onExportCSV}
            onExportExcel={onExportExcel}
            isExporting={isExporting}
          />
        </div>
      </div>
    </div>
  );
}
