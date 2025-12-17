import { ChevronDown } from "lucide-react";
import { type Table } from "@tanstack/react-table";

type ColumnVisibilityDropdownProps<T> = {
  table: Table<T>;
  onToggleColumn: (columnId: string) => void;
};

export function ColumnVisibilityDropdown<T>({
  table,
  onToggleColumn,
}: ColumnVisibilityDropdownProps<T>) {
  return (
    <div className="relative group">
      <button className="px-3 py-2 cursor-pointer text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1">
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
                  onChange={() => onToggleColumn(column.id)}
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
  );
}
