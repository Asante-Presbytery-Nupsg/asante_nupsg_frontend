import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type TablePaginationProps = {
  displayPageSize: number;
  displayPageIndex: number;
  displayTotalCount: number;
  handlePageSizeChange: (size: number) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
};
const TablePagination: React.FC<TablePaginationProps> = ({
  displayPageSize,
  displayPageIndex,
  displayTotalCount,
  handlePageSizeChange,
  handlePreviousPage,
  handleNextPage,
  isPrevDisabled,
  isNextDisabled,
}) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      {/* Left side: page size selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Show rows per page</span>
        <select
          value={displayPageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
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
          {displayPageIndex * displayPageSize + 1} -{" "}
          {Math.min(
            (displayPageIndex + 1) * displayPageSize,
            displayTotalCount
          )}{" "}
          of {displayTotalCount}
        </span>

        <div className="flex gap-3 justify-between">
          <button
            onClick={handlePreviousPage}
            disabled={isPrevDisabled}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed border flex items-center gap-1"
          >
            <ChevronLeftIcon size={16} /> Back
          </button>

          <button
            onClick={handleNextPage}
            disabled={isNextDisabled}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed border flex items-center gap-1"
          >
            Next <ChevronRightIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
