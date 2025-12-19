import StatCard from "@/components/shared/StatCard";
import StatCardSkeleton from "@/components/shared/StatCardSkeleton";
import { User, Building, Book, Diamond } from "lucide-react";

interface Stats {
  users: number;
  institutions: number;
  programmes: number;
  presbyteries: number;
}

interface StatsSectionProps {
  stats?: Stats;
  isLoading: boolean;
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats, isLoading }) => {
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {isLoading ? (
        <>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </>
      ) : (
        <>
          <StatCard title="Users" value={stats?.users} icon={User} />
          <StatCard
            title="Institutions"
            value={stats?.institutions}
            icon={Building}
          />
          <StatCard title="Programmes" value={stats?.programmes} icon={Book} />
          <StatCard
            title="Presbyteries"
            value={stats?.presbyteries}
            icon={Diamond}
          />
        </>
      )}
    </div>
  );
};

export default StatsSection;
