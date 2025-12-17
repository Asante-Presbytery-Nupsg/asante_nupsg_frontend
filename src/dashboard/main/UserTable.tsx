import { useMemo, useState, useEffect } from "react";
import { type UserType } from "@/schema/userSchema";
import { useDataTable } from "@/hooks/useDataTable";
import { useUserColumns } from "../../hooks/useUserColumns";
import TablePagination from "@/components/shared/TablePagination";
import { TableHeader } from "@/components/usertable/TableHeader";
import { DataTable } from "@/components/usertable/DataTable";

type UserTableProps = {
  users: UserType[];
  isLoading?: boolean;
  serverSide?: boolean;
  totalCount?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSearchChange?: (search: string) => void;
  onInstitutionChange?: (institutionId: string | undefined) => void;
  onPresbyteryChange?: (presbyteryId: string | undefined) => void;
  allInstitutions?: Array<{ id: string; name: string }>;
  allPresbyteries?: Array<{ id: string; name: string }>;
  onExport?: (format: "csv" | "xlsx") => Promise<void>;
  onInstitutionSearch?: (search: string) => void;
  onPresbyterySearch?: (search: string) => void;
  isLoadingInstitutions?: boolean;
  isLoadingPresbyteries?: boolean;
};

export function UserTable({
  users,
  isLoading = false,
  serverSide = false,
  totalCount,
  currentPage = 1,
  pageSize: serverPageSize = 10,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
  onInstitutionChange,
  onPresbyteryChange,
  allInstitutions,
  allPresbyteries,
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

  // Debounce search for server-side
  useEffect(() => {
    if (!serverSide) return;
    const timer = setTimeout(() => {
      onSearchChange?.(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, serverSide, onSearchChange]);

  // Handle filter changes
  useEffect(() => {
    if (!serverSide) return;
    onInstitutionChange?.(selectedInstitution);
  }, [selectedInstitution, serverSide, onInstitutionChange]);

  useEffect(() => {
    if (!serverSide) return;
    onPresbyteryChange?.(selectedPresbytery);
  }, [selectedPresbytery, serverSide, onPresbyteryChange]);

  // Client-side filtering
  const filteredUsers = useMemo(() => {
    if (serverSide) return users;

    return users.filter((user) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        user.first_name?.toLowerCase().includes(query) ||
        user.last_name?.toLowerCase().includes(query) ||
        user.other_name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.phone?.toLowerCase().includes(query) ||
        user.whatsapp?.toLowerCase().includes(query) ||
        user.programme_name?.toLowerCase().includes(query) ||
        user.institution_name?.toLowerCase().includes(query) ||
        user.region_name?.toLowerCase().includes(query) ||
        user.presbytery_name?.toLowerCase().includes(query);

      const matchesInstitution = selectedInstitution
        ? user.institution_name === selectedInstitution
        : true;
      const matchesPresbytery = selectedPresbytery
        ? user.presbytery_name === selectedPresbytery
        : true;

      return matchesSearch && matchesInstitution && matchesPresbytery;
    });
  }, [users, searchQuery, selectedInstitution, selectedPresbytery, serverSide]);

  const columns = useUserColumns();

  const {
    table,
    pageIndex,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    selectedRows,
    resetSelection,
    setColumnVisibility,
    exportToCSV,
    exportToXLSX,
  } = useDataTable({
    data: filteredUsers as UserType[],
    columns,
    pageSize: serverSide ? serverPageSize : 10,
    manualPagination: serverSide,
    pageCount:
      serverSide && totalCount
        ? Math.ceil(totalCount / serverPageSize)
        : undefined,
  });

  // Pagination handlers
  const handleNextPage = () => {
    if (serverSide) {
      onPageChange?.(currentPage + 1);
    } else {
      nextPage();
    }
  };

  const handlePreviousPage = () => {
    if (serverSide) {
      onPageChange?.(currentPage - 1);
    } else {
      previousPage();
    }
  };

  const handlePageSizeChange = (size: number) => {
    if (serverSide) {
      onPageSizeChange?.(size);
    } else {
      table.setPageSize(size);
    }
  };

  const toggleColumn = (columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  // Get filter options
  const institutionOptions = serverSide
    ? (allInstitutions || []).map((inst) => ({
        value: inst.id,
        label: inst.name,
      }))
    : Array.from(
        new Set(users.map((u) => u.institution_name).filter(Boolean))
      ).map((name) => ({ value: name!, label: name! }));

  const presbyteryOptions = serverSide
    ? (allPresbyteries || []).map((pres) => ({
        value: pres.id,
        label: pres.name,
      }))
    : Array.from(
        new Set(users.map((u) => u.presbytery_name).filter(Boolean))
      ).map((name) => ({ value: name!, label: name! }));

  // Export handlers
  const handleExport = async (format: "csv" | "xlsx") => {
    if (serverSide && onExport) {
      setIsExporting(true);
      try {
        await onExport(format);
      } finally {
        setIsExporting(false);
      }
    } else {
      if (format === "csv") {
        exportToCSV();
      } else {
        exportToXLSX();
      }
    }
  };

  // Pagination display values
  const displayPageSize = serverSide
    ? serverPageSize
    : table.getState().pagination.pageSize;
  const displayPageIndex = serverSide ? currentPage - 1 : pageIndex;
  const displayTotalCount = serverSide ? totalCount || 0 : filteredUsers.length;
  const isNextDisabled = serverSide
    ? totalCount
      ? currentPage >= Math.ceil(totalCount / serverPageSize)
      : false
    : !canNextPage;
  const isPrevDisabled = serverSide ? currentPage <= 1 : !canPreviousPage;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <TableHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedInstitution={selectedInstitution}
        selectedPresbytery={selectedPresbytery}
        onInstitutionChange={setSelectedInstitution}
        onPresbyteryChange={setSelectedPresbytery}
        institutionOptions={institutionOptions}
        presbyteryOptions={presbyteryOptions}
        selectedCount={selectedRows.length}
        onClearSelection={resetSelection}
        table={table}
        onToggleColumn={toggleColumn}
        onExportCSV={() => handleExport("csv")}
        onExportExcel={() => handleExport("xlsx")}
        isExporting={isExporting}
        onInstitutionSearch={onInstitutionSearch}
        onPresbyterySearch={onPresbyterySearch}
        isLoadingInstitutions={isLoadingInstitutions}
        isLoadingPresbyteries={isLoadingPresbyteries}
      />

      <DataTable
        table={table}
        columns={columns}
        emptyMessage="No users found"
        searchQuery={searchQuery}
      />

      <TablePagination
        displayPageSize={displayPageSize}
        displayPageIndex={displayPageIndex}
        displayTotalCount={displayTotalCount}
        handlePageSizeChange={handlePageSizeChange}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
}
