import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { type MultiStepUserInput } from "@/schema/userSchema";
import { format } from "date-fns";
import { useDataTable } from "@/hooks/useDataTable";
import {
  ChevronDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  Search,
} from "lucide-react";
// Extend the user type with an ID and relation names
type User = MultiStepUserInput & {
  id: string;
  programme_name?: string;
  institution_name?: string;
  region_name?: string;
  presbytery_name?: string;
};

type UserTableProps = {
  users: User[];
  isLoading?: boolean;
};

export function UserTable({ users, isLoading = false }: UserTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState<
    string | undefined
  >();
  const [selectedPresbytery, setSelectedPresbytery] = useState<
    string | undefined
  >();

  /* ========================
     Filtered Data
  ======================== */
  const filteredUsers = useMemo(() => {
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
  }, [users, searchQuery, selectedInstitution, selectedPresbytery]);

  /* ========================
     Column Definitions
  ======================== */
  const columns = useMemo<ColumnDef<User, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="cursor-pointer"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="cursor-pointer"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "first_name",
        header: "First Name",
        cell: ({ getValue }) => getValue() as string,
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        cell: ({ getValue }) => getValue() as string,
      },
      {
        accessorKey: "other_name",
        header: "Other Name",
        cell: ({ getValue }) => (getValue() as string) || "—",
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span
              title={row.getValue("email") as string}
              className="truncate max-w-[20ch]"
            >
              {row.getValue("email") as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[20ch]">
              {row.getValue("phone") as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "whatsapp",
        header: "WhatsApp",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[20ch]">
              {row.getValue("whatsapp") as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "dob",
        header: "Date of Birth",
        cell: ({ getValue }) => {
          const date = getValue() as Date | undefined;
          return date ? format(date, "MMM dd, yyyy") : "—";
        },
      },
      {
        accessorKey: "programme_name",
        header: "Programme",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[20ch]">
              {row.getValue("programme_name") as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "institution_name",
        header: "Institution",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[18ch]">
              {row.getValue("institution_name") as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "high_school",
        header: "High School",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[20ch]">
              {row.getValue("high_school") as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "congregation",
        header: "Congregation",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[20ch]">
              {row.getValue("congregation") as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "region_name",
        header: "Region",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[20ch]">
              {row.getValue("region_name") as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "district_church",
        header: "District (Church)",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[20ch]">
              {row.getValue("district_church") as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "presbytery_name",
        header: "Presbytery",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[20ch]">
              {row.getValue("presbytery_name") as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "guardian_name",
        header: "Guardian Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[20ch]">
              {row.getValue("guardian_name") as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "guardian_contact",
        header: "Guardian Contact",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[20ch]">
              {row.getValue("guardian_contact") as string}
            </span>
          </div>
        ),
      },
    ],
    []
  );

  /* ========================
     Table Hook
  ======================== */
  const {
    table,
    pageIndex,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    selectedRows,
    resetSelection,
    // columnVisibility,
    setColumnVisibility,
    exportToCSV,
    exportToXLSX,
  } = useDataTable({
    data: filteredUsers,
    columns,
    pageSize: 10,
  });

  /* ========================
     Toggle Column Visibility
  ======================== */
  const toggleColumn = (columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  /* ========================
     Render
  ======================== */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row">
        {/* Search Bar */}
        <div className="flex items-start gap-2 w-full sm:w-96 flex-col">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-88 pl-9 pr-4 py-1.5 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 flex-col min-[500px]:flex-row items-center w-full">
            {/* Add filter dropdown for presbytery etc
             */}
            <select
              value={selectedInstitution || ""}
              onChange={(e) =>
                setSelectedInstitution(e.target.value || undefined)
              }
              className="px-2 py-1.5 border border-gray-300 rounded bg-white text-sm w-full min-[500px]:w-fit"
            >
              <option value="">All Institutions</option>
              {Array.from(
                new Set(users.map((u) => u.institution_name).filter(Boolean))
              ).map((i) => (
                <option key={i} value={i}>
                  {i && i?.length > 16 ? `${i?.slice(0, 20)}...` : i}
                </option>
              ))}
            </select>

            <select
              value={selectedPresbytery || ""}
              onChange={(e) =>
                setSelectedPresbytery(e.target.value || undefined)
              }
              className="px-2 py-1.5 border border-gray-300 rounded bg-white text-sm w-full min-[500px]:w-fit"
            >
              <option value="">All Presbyteries</option>
              {Array.from(
                new Set(users.map((u) => u.presbytery_name).filter(Boolean))
              ).map((p) => (
                <option key={p} value={p}>
                  {p && p?.length > 16 ? `${p?.slice(0, 20)}...` : p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            {selectedRows.length > 0 && (
              <>
                <span className="text-sm text-gray-600">
                  {selectedRows.length} selected
                </span>
                <button
                  onClick={resetSelection}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear
                </button>
              </>
            )}
          </div>

          <div className="flex gap-2 items-center">
            {/* Column Visibility Dropdown */}
            <div className="relative group">
              <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1">
                Columns <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <div className="p-2 max-h-64 overflow-y-auto">
                  {table.getAllLeafColumns().map((column) => {
                    if (!column.getCanHide()) return null;
                    return (
                      <label
                        key={column.id}
                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={column.getIsVisible()}
                          onChange={() => toggleColumn(column.id)}
                          className="cursor-pointer"
                        />
                        <span className="text-sm text-gray-700">
                          {typeof column.columnDef.header === "string"
                            ? column.columnDef.header
                            : column.id}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              onClick={exportToCSV}
              className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              Export CSV
            </button>
            <button
              onClick={exportToXLSX}
              className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-4 text-left text-sm font-medium text-gray-700 text-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : typeof header.column.columnDef.header === "function"
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    {searchQuery
                      ? "No users match your search"
                      : "No users found"}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={
                      row.getIsSelected() ? "bg-blue-50" : "hover:bg-gray-50"
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-5 text-sm text-gray-700"
                      >
                        {typeof cell.column.columnDef.cell === "function"
                          ? cell.column.columnDef.cell(cell.getContext())
                          : (cell.getValue() as string)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Left side: page size selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show rows per page</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="px-2 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[5, 10, 20, 30, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Right side: page info + buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-sm text-gray-600 hidden sm:block">
            {pageIndex * table.getState().pagination.pageSize + 1} -{" "}
            {Math.min(
              (pageIndex + 1) * table.getState().pagination.pageSize,
              filteredUsers.length
            )}{" "}
            of {filteredUsers.length}
          </span>
          <div className="flex gap-3 justify-between">
            <button
              onClick={previousPage}
              disabled={!canPreviousPage}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent border flex items-center justify-center gap-1"
              aria-label="Previous page"
            >
              <ChevronLeftIcon size={16} /> Back
            </button>
            <button
              onClick={nextPage}
              disabled={!canNextPage}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent text-sm font-medium border flex items-center justify-center gap-1"
              aria-label="Next page"
            >
              Next <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
