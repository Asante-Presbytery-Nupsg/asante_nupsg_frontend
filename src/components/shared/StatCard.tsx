import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | undefined;
  icon: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => {
  return (
    <div className="p-5 border rounded-xs space-y-3">
      <div className="flex items-center gap-2">
        <div className="border border-gray-300 h-7 w-7 rounded-sm flex items-center justify-center">
          <Icon size={18} className="text-gray-500" />
        </div>
        <h2 className="font-medium text-gray-600">Total {title}</h2>
      </div>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
};

export default StatCard;
