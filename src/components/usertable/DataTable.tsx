import { type Table, flexRender } from "@tanstack/react-table";

type DataTableProps<T> = {
  table: Table<T>;
  columns: unknown[];
  emptyMessage?: string;
  searchQuery?: string;
};

export function DataTable<T>({
  table,
  columns,
  emptyMessage = "No data found",
  searchQuery = "",
}: DataTableProps<T>) {
  return (
    <div className="border border-gray-200 rounded-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-4 text-left text-xs font-bold tracking-wider uppercase text-gray-700 text-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                  {searchQuery ? "No users match your search" : emptyMessage}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
