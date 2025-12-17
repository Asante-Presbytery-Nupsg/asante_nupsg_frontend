import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { UserTable } from "./UserTable";
import { BASE_API } from "@/api/base";
import { Book, Building, Diamond, User } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import * as XLSX from "xlsx";
import type { UserType } from "@/schema/userSchema";

interface Stats {
  users: number;
  institutions: number;
  programmes: number;
  presbyteries: number;
}

const DashHome = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [institutionId, setInstitutionId] = useState<string | undefined>();
  const [presbyteryId, setPresbyteryId] = useState<string | undefined>();
  const [institutionSearch, setInstitutionSearch] = useState("");
  const [presbyterySearch, setPresbyterySearch] = useState("");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users", page, limit, search, institutionId, presbyteryId],
    queryFn: async () => {
      const res = await BASE_API.get("/users", {
        withCredentials: true,
        params: {
          page,
          limit,
          search,
          institutionId: institutionId || "",
          presbyteryId: presbyteryId || "",
        },
      });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  const { data: stats, isLoading: isStatsLoading } = useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await BASE_API.get("/stats", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const { data: institutions, isLoading: isLoadingInstitutions } = useQuery({
    queryKey: ["institutions", institutionSearch],
    queryFn: async () => {
      const res = await BASE_API.get("/institutions", {
        withCredentials: true,
        params: {
          search: institutionSearch,
          limit: institutionSearch ? 100 : 30,
        },
      });

      return Array.isArray(res.data.institutions) ? res.data.institutions : [];
    },
  });

  const { data: presbyteries, isLoading: isLoadingPresbyteries } = useQuery({
    queryKey: ["presbyteries", presbyterySearch],
    queryFn: async () => {
      const res = await BASE_API.get("/presbyteries", {
        withCredentials: true,
        params: {
          search: presbyterySearch,
          limit: presbyterySearch ? 100 : 30,
        },
      });
      // Ensure we return an array
      return Array.isArray(res.data.presbyteries) ? res.data.presbyteries : [];
    },
  });

  if (isStatsLoading) return <div>Loading...</div>;

  const handleExport = async (format: "csv" | "xlsx") => {
    try {
      const res = await BASE_API.get("/users", {
        withCredentials: true,
        params: {
          page: 1,
          limit: 999999,
          search,
          institutionId: institutionId || "",
          presbyteryId: presbyteryId || "",
        },
      });

      const allUsers = res.data.users || [];

      if (allUsers.length === 0) {
        alert("No data to export");
        return;
      }

      // Prepare data for export
      const exportData = allUsers.map((user: UserType) => ({
        "First Name": user.first_name || "",
        "Last Name": user.last_name || "",
        "Other Name": user.other_name || "",
        Email: user.email || "",
        Phone: user.phone || "",
        WhatsApp: user.whatsapp || "",
        "Date of Birth": user.dob || "",
        Programme: user.programme_name || "",
        Institution: user.institution_name || "",
        "High School": user.high_school || "",
        Congregation: user.congregation || "",
        Region: user.region_name || "",
        "District (Church)": user.district_church || "",
        Presbytery: user.presbytery_name || "",
        "Guardian Name": user.guardian_name || "",
        "Guardian Contact": user.guardian_contact || "",
      }));

      if (format === "csv") {
        // Export as CSV
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `users_export_${
          new Date().toISOString().split("T")[0]
        }.csv`;
        link.click();
      } else {
        // Export as Excel
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(
          workbook,
          `users_export_${new Date().toISOString().split("T")[0]}.xlsx`
        );
      }
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data. Please try again.");
    }
  };

  return (
    <div className="m-4 bg-white/35">
      <div className="border p-5 rounded-xs">
        <h2 className="font-semibold text-blue-950">
          Welcome to the Admin Panel
        </h2>
        <p className="text-sm text-gray-500">
          This is where you can manage your data.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </div>

      {/* User table*/}
      <div className="mt-5">
        <div className="bg-gray-100/60">
          <div className="border p-5 rounded-xs flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-blue-950">User Data</h2>
              <p className="text-sm text-gray-500">View and manage users.</p>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer transition-all duration-200 text-white px-4 py-2 text-sm rounded-xs mt-4">
              New User
            </button>
          </div>
        </div>
        <div className="border mt-2 p-5">
          <UserTable
            users={data?.users || []}
            isLoading={isLoading && !isFetching}
            serverSide={true}
            totalCount={stats?.users || 0}
            currentPage={page}
            pageSize={limit}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setLimit(size);
              setPage(1);
            }}
            onSearchChange={(searchTerm) => {
              setSearch(searchTerm);
              setPage(1);
            }}
            onInstitutionChange={(id) => {
              setInstitutionId(id);
              setPage(1);
            }}
            onPresbyteryChange={(id) => {
              setPresbyteryId(id);
              setPage(1);
            }}
            allInstitutions={institutions}
            allPresbyteries={presbyteries}
            onExport={handleExport}
            onInstitutionSearch={setInstitutionSearch}
            onPresbyterySearch={setPresbyterySearch}
            isLoadingInstitutions={isLoadingInstitutions}
            isLoadingPresbyteries={isLoadingPresbyteries}
          />
        </div>
      </div>
    </div>
  );
};

export default DashHome;
