import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import type { UserType } from "@/schema/userSchema";

export const useUserColumns = () => {
  const columns = useMemo<ColumnDef<UserType>[]>(
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
        cell: ({ getValue }) => {
          return (
            <div className="flex items-center gap-2 font-medium">
              <span className="truncate max-w-[20ch]">
                {getValue<string>() || "NULL"}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        cell: ({ getValue }) => {
          return (
            <div className="flex items-center gap-2 font-medium">
              <span className="truncate max-w-[20ch]">
                {getValue<string>() || "NULL"}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "other_name",
        header: "Other Name",
        cell: ({ cell }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="text-nowrap">
              {cell.getValue<string>() || "NULL"}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span
              title={row.getValue("email")}
              className="truncate max-w-[20ch]"
            >
              {row.getValue("email") || "NULL"}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="truncate max-w-[20ch]">
              {row.getValue("phone")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "whatsapp",
        header: "WhatsApp",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="truncate max-w-[20ch] text-nowrap">
              {row.getValue("whatsapp") ? row.getValue("whatsapp") : "NULL"}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "dob",
        header: "Date of Birth",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="text-nowrap">
              {row.getValue("dob")
                ? format(row.getValue("dob"), "dd MMM, yyyy")
                : "NULL"}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "programme_name",
        header: "Programme",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="truncate max-w-[20ch] text-nowrap">
              {row.getValue("programme_name")
                ? row.getValue("programme_name")
                : "NULL"}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "institution_name",
        header: "Institution",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="truncate max-w-[18ch] text-nowrap">
              {row.getValue("institution_name")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "high_school",
        header: "High School",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="truncate max-w-[20ch] text-nowrap">
              {row.getValue("high_school")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "residence",
        header: "Residence",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="truncate max-w-[20ch] text-nowrap">
              {row.getValue("residence") ? row.getValue("residence") : "NULL"}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "congregation",
        header: "Congregation",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="truncate max-w-[20ch]">
              {row.getValue("congregation")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "region_name",
        header: "Region",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="truncate max-w-[20ch]">
              {row.getValue("region_name")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "district_church",
        header: "Church District",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="truncate max-w-[20ch]">
              {row.getValue("district_church")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "presbytery_name",
        header: "Presbytery",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="truncate max-w-[20ch]">
              {row.getValue("presbytery_name")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "guardian_name",
        header: "Guardian Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="truncate max-w-[20ch]">
              {row.getValue("guardian_name")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "guardian_contact",
        header: "Guardian Contact",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <span className="truncate max-w-[20ch]">
              {row.getValue("guardian_contact")}
            </span>
          </div>
        ),
      },
    ],
    []
  );

  return columns;
};
