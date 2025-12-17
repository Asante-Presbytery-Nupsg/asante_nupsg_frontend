import { useEffect, useState } from "react";
import {
  type ColumnDef,
  type RowSelectionState,
  type VisibilityState,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type UseDataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  pageSize?: number;

  /** OPTIONAL – only used for server-side pagination */
  manualPagination?: boolean;
  pageCount?: number;
};

const COLUMN_VISIBILITY_KEY = "datatable-column-visibility";

export function useDataTable<T>({
  data,
  columns,
  pageSize = 10,
  manualPagination = false,
  pageCount,
}: UseDataTableProps<T>) {
  /* ========================
     Initial Column Visibility from Column Definitions
  ======================== */
  const getInitialColumnVisibility = (): VisibilityState => {
    if (typeof window === "undefined") return {};

    const saved = localStorage.getItem(COLUMN_VISIBILITY_KEY);
    if (saved) {
      return JSON.parse(saved);
    }

    // Build default visibility - hide columns ending with _id
    const defaultVisibility: VisibilityState = {};
    columns.forEach((col) => {
      const columnId =
        ("id" in col && col.id) ||
        ("accessorKey" in col && (col.accessorKey as string));
      if (
        columnId &&
        typeof columnId === "string" &&
        columnId.endsWith("_id")
      ) {
        defaultVisibility[columnId] = false;
      }
    });

    return defaultVisibility;
  };

  /* ========================
     State
  ======================== */
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    getInitialColumnVisibility
  );

  /* ========================
     Persist Column Visibility
  ======================== */
  useEffect(() => {
    localStorage.setItem(
      COLUMN_VISIBILITY_KEY,
      JSON.stringify(columnVisibility)
    );
  }, [columnVisibility]);

  /* ========================
     Table Instance
  ======================== */
  const table = useReactTable({
    data,
    columns,

    state: {
      rowSelection,
      columnVisibility,
    },

    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,

    manualPagination,
    pageCount,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: manualPagination
      ? undefined
      : getPaginationRowModel(),

    initialState: {
      pagination: { pageSize },
    },

    enableRowSelection: true,
  });

  /* ========================
     Bulk Selected Rows
  ======================== */
  const selectedRows = table.getSelectedRowModel().rows;

  /* ========================
     CSV Export (visible + filtered rows)
  ======================== */
  const exportToCSV = () => {
    const visibleColumns = table
      .getAllLeafColumns()
      .filter((col) => col.getIsVisible());

    const headers = visibleColumns.map((col) => col.id);

    const rows = table
      .getFilteredRowModel()
      .rows.map((row) => headers.map((header) => row.getValue(header)));

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "table-export.csv";
    link.click();
  };

  /* ========================
     XLSX Export (Excel)
  ======================== */
  const exportToXLSX = () => {
    const visibleColumns = table
      .getAllLeafColumns()
      .filter((col) => col.getIsVisible());

    const rows = table.getFilteredRowModel().rows.map((row) => {
      const obj: Record<string, unknown> = {};
      visibleColumns.forEach((col) => {
        obj[col.id] = row.getValue(col.id);
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      "table-export.xlsx"
    );
  };

  /* ========================
     Return API (UNCHANGED + EXTENDED)
  ======================== */
  return {
    table,

    /* Pagination */
    pageIndex: table.getState().pagination.pageIndex,
    pageCount: table.getPageCount(),
    nextPage: table.nextPage,
    previousPage: table.previousPage,
    canNextPage: table.getCanNextPage(),
    canPreviousPage: table.getCanPreviousPage(),

    /* Column Visibility */
    columnVisibility,
    setColumnVisibility,

    /* Bulk Actions */
    selectedRows,
    resetSelection: () => table.resetRowSelection(),

    /* Export */
    exportToCSV,
    exportToXLSX,
  };
}
