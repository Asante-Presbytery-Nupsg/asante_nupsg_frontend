import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_API } from "@/api/base";
import * as XLSX from "xlsx";
import type { UserType } from "@/schema/userSchema";
import StatsSection from "@/components/dashboard/StatSection";
import UserSection from "@/components/dashboard/UserSection";

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

  // Users
  const { data, isFetching } = useQuery({
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
    placeholderData: (prev) => prev,
  });

  // Stats
  const { data: stats, isLoading: isStatsLoading } = useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () =>
      (await BASE_API.get("/stats", { withCredentials: true })).data,
  });

  // Institutions
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

  // Presbyteries
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
      return Array.isArray(res.data.presbyteries) ? res.data.presbyteries : [];
    },
  });

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
      if (!allUsers.length) return alert("No data to export");

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
        Residence: user.residence || "",
        Congregation: user.congregation || "",
        Region: user.region_name || "",
        "Church District": user.district_church || "",
        Presbytery: user.presbytery_name || "",
        "Guardian Name": user.guardian_name || "",
        "Guardian Contact": user.guardian_contact || "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      if (format === "csv") {
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `users_export_${
          new Date().toISOString().split("T")[0]
        }.csv`;
        link.click();
      } else {
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(
          workbook,
          `users_export_${new Date().toISOString().split("T")[0]}.xlsx`
        );
      }
    } catch (error) {
      console.error(error);
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

      {/* Stats Section */}
      <StatsSection stats={stats} isLoading={isStatsLoading} />

      {/* Users Section */}
      <UserSection
        users={data?.users || []}
        isLoading={isFetching}
        totalCount={data?.meta?.totalItems || 0}
        currentPage={page}
        pageSize={limit}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setLimit(size);
          setPage(1);
        }}
        onSearchChange={(s) => {
          setSearch(s);
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
  );
};

export default DashHome;
