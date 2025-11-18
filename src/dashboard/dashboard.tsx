import StatCard from "@/components/dashboard/StatCard";
import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard />
      <StatCard />
      <StatCard />
      <StatCard />
      <StatCard />
      <StatCard />
    </div>
  );
};

export default Dashboard;
