const StatCardSkeleton = () => {
  return (
    <div className="rounded-xs border bg-white p-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-4 w-24 rounded bg-gray-100" />
          <div className="h-6 w-16 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default StatCardSkeleton;
