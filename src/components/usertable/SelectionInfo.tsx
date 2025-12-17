type SelectionInfoProps = {
  selectedCount: number;
  onClear: () => void;
};

export function SelectionInfo({ selectedCount, onClear }: SelectionInfoProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">{selectedCount} selected</span>
      <button
        onClick={onClear}
        className="text-sm text-blue-600 hover:text-blue-700"
      >
        Clear
      </button>
    </div>
  );
}
