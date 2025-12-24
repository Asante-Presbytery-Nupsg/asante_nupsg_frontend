import { useState, useMemo } from "react";
import { type UserType } from "@/schema/userSchema";
import { useUserColumns } from "../../hooks/useUserColumns";
import TablePagination from "@/components/shared/TablePagination";
import { TableHeader } from "@/components/usertable/TableHeader";
import { DataTable } from "@/components/usertable/DataTable";
import {
  type RowSelectionState,
  type VisibilityState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type UserTableProps = {
  users: UserType[];
  isLoading?: boolean;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSearchChange: (search: string) => void;
  onInstitutionChange: (institutionId: string | undefined) => void;
  onPresbyteryChange: (presbyteryId: string | undefined) => void;

  allInstitutions?: Array<{ id: string; name: string }>;
  allPresbyteries?: Array<{ id: string; name: string }>;

  onExport: (format: "csv" | "xlsx") => Promise<void>;
  onInstitutionSearch: (search: string) => void;
  onPresbyterySearch: (search: string) => void;
  isLoadingInstitutions?: boolean;
  isLoadingPresbyteries?: boolean;
};

const COLUMN_VISIBILITY_KEY = "datatable-column-visibility";

export function UserTable({
  users,
  isLoading = false,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
  onInstitutionChange,
  onPresbyteryChange,

  allInstitutions = [],
  allPresbyteries = [],

  onExport,
  onInstitutionSearch,
  onPresbyterySearch,
  isLoadingInstitutions = false,
  isLoadingPresbyteries = false,
}: UserTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState<
    string | undefined
  >();
  const [selectedPresbytery, setSelectedPresbytery] = useState<
    string | undefined
  >();
  const [isExporting, setIsExporting] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => {
      if (typeof window === "undefined") return {};
      const saved = localStorage.getItem(COLUMN_VISIBILITY_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            email: true,
            phone: true,
            institution_name: true,
            presbytery_name: true,
            whatsapp: false,
            dob: false,
            residence: false,
            guardian_name: false,
            guardian_contact: false,
            other_name: false,
            region_name: false,
            district_church: false,
          };
    }
  );

  const columns = useUserColumns();

  const table = useReactTable({
    data: users,
    columns,
    state: { rowSelection, columnVisibility },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: (updater) => {
      setColumnVisibility((old) => {
        const newState = typeof updater === "function" ? updater(old) : updater;
        localStorage.setItem(COLUMN_VISIBILITY_KEY, JSON.stringify(newState));
        return newState;
      });
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    enableRowSelection: true,
  });

  /* -------------------------- SAFE OPTION MAPPING -------------------------- */

  const institutionOptions = useMemo(
    () =>
      allInstitutions.map((inst) => ({
        value: inst.id,
        label: inst.name,
      })),
    [allInstitutions]
  );

  const presbyteryOptions = useMemo(
    () =>
      allPresbyteries.map((pres) => ({
        value: pres.id,
        label: pres.name,
      })),
    [allPresbyteries]
  );

  /* ------------------------------- Handlers -------------------------------- */

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setTimeout(() => onSearchChange(value), 500);
  };

  const handleInstitutionChange = (value: string | undefined) => {
    setSelectedInstitution(value);
    onInstitutionChange(value);
  };

  const handlePresbyteryChange = (value: string | undefined) => {
    setSelectedPresbytery(value);
    onPresbyteryChange(value);
  };

  const handleExport = async (format: "csv" | "xlsx") => {
    setIsExporting(true);
    try {
      await onExport(format);
    } finally {
      setIsExporting(false);
    }
  };

  const selectedRows = table.getSelectedRowModel().rows;
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="w-full space-y-4">
      <TableHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedInstitution={selectedInstitution}
        selectedPresbytery={selectedPresbytery}
        onInstitutionChange={handleInstitutionChange}
        onPresbyteryChange={handlePresbyteryChange}
        institutionOptions={institutionOptions}
        presbyteryOptions={presbyteryOptions}
        selectedCount={selectedRows.length}
        onClearSelection={() => table.resetRowSelection()}
        table={table}
        onToggleColumn={(id) =>
          setColumnVisibility((prev) => ({
            ...prev,
            [id]: !prev[id],
          }))
        }
        onExportCSV={() => handleExport("csv")}
        onExportExcel={() => handleExport("xlsx")}
        isExporting={isExporting}
        onInstitutionSearch={onInstitutionSearch}
        onPresbyterySearch={onPresbyterySearch}
        isLoadingInstitutions={isLoadingInstitutions}
        isLoadingPresbyteries={isLoadingPresbyteries}
      />

      <div className="relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
            <p className="text-sm font-medium text-gray-600">
              Loading users...
            </p>
          </div>
        )}

        <DataTable
          table={table}
          columns={columns}
          emptyMessage="No users found"
          searchQuery={searchQuery}
        />
      </div>

      <TablePagination
        displayPageSize={pageSize}
        displayPageIndex={currentPage - 1}
        displayTotalCount={totalCount}
        handlePageSizeChange={(size) => {
          onPageSizeChange(size);
          onPageChange(1);
        }}
        handlePreviousPage={() => onPageChange(currentPage - 1)}
        handleNextPage={() => onPageChange(currentPage + 1)}
        isPrevDisabled={currentPage <= 1}
        isNextDisabled={currentPage >= totalPages}
      />
    </div>
  );
}
