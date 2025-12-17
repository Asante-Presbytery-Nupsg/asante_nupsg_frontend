type ExportButtonsProps = {
  onExportCSV: () => void;
  onExportExcel: () => void;
  isExporting: boolean;
};

export function ExportButtons({
  onExportCSV,
  onExportExcel,
  isExporting,
}: ExportButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onExportCSV}
        disabled={isExporting}
        className="px-3 py-2 text-sm cursor-pointer bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExporting ? "Exporting..." : "Export CSV"}
      </button>
      <button
        onClick={onExportExcel}
        disabled={isExporting}
        className="px-3 py-2 text-sm cursor-pointer bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExporting ? "Exporting..." : "Export Excel"}
      </button>
    </div>
  );
}
