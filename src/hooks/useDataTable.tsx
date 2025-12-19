import { useEffect, useState, useCallback } from "react";
import {
  type ColumnDef,
  type RowSelectionState,
  type VisibilityState,
  type PaginationState,
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
  pageIndex?: number; // Added to support controlled server-side pagination
  manualPagination?: boolean;
  pageCount?: number;
  initialColumnVisibility?: VisibilityState;
};

const COLUMN_VISIBILITY_KEY = "datatable-column-visibility";

export function useDataTable<T>({
  data,
  columns,
  pageSize = 10,
  pageIndex = 0,
  manualPagination = false,
  pageCount,
  initialColumnVisibility,
}: UseDataTableProps<T>) {
  // 1. Column Visibility Persistence Logic
  const getInitialColumnVisibility = useCallback((): VisibilityState => {
    if (typeof window === "undefined") return initialColumnVisibility ?? {};

    const saved = localStorage.getItem(COLUMN_VISIBILITY_KEY);
    if (saved) return JSON.parse(saved);

    const visibility: VisibilityState = { ...initialColumnVisibility };

    columns.forEach((col) => {
      const columnId =
        ("id" in col && col.id) ||
        ("accessorKey" in col && (col.accessorKey as string));

      if (
        columnId &&
        typeof columnId === "string" &&
        columnId.endsWith("_id")
      ) {
        visibility[columnId] ??= false;
      }
    });

    return visibility;
  }, [columns, initialColumnVisibility]);

  // 2. States
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    getInitialColumnVisibility()
  );

  // Pagination state: Controlled by props when manualPagination is true
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex,
    pageSize: pageSize,
  });

  // 3. Sync internal state with props (CRITICAL for Server-Side)
  // This prevents the "flash" by forcing the table state to match your API state
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: pageIndex,
      pageSize: pageSize,
    }));
  }, [pageIndex, pageSize]);

  // Persist column visibility
  useEffect(() => {
    localStorage.setItem(
      COLUMN_VISIBILITY_KEY,
      JSON.stringify(columnVisibility)
    );
  }, [columnVisibility]);

  // 4. Table Instance
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      columnVisibility,
      pagination,
    },
    // CRITICAL: Prevents reset to page 0 when 'data' updates from server
    autoResetPageIndex: false,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    manualPagination,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: manualPagination
      ? undefined
      : getPaginationRowModel(),
    enableRowSelection: true,
  });

  // 5. Helper Methods
  const selectedRows = table.getSelectedRowModel().rows;

  const exportToCSV = () => {
    const visibleColumns = table
      .getAllLeafColumns()
      .filter((col) => col.getIsVisible());
    const headers = visibleColumns.map((col) => col.id);
    const rows = table
      .getFilteredRowModel()
      .rows.map((row) => headers.map((header) => row.getValue(header)));

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `export-${new Date().toISOString()}.csv`;
    link.click();
  };

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
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      `export-${new Date().toISOString()}.xlsx`
    );
  };

  return {
    table,
    pageIndex: pagination.pageIndex,
    pageCount: table.getPageCount(),
    nextPage: table.nextPage,
    previousPage: table.previousPage,
    canNextPage: table.getCanNextPage(),
    canPreviousPage: table.getCanPreviousPage(),
    columnVisibility,
    setColumnVisibility,
    selectedRows,
    resetSelection: () => table.resetRowSelection(),
    exportToCSV,
    exportToXLSX,
  };
}
