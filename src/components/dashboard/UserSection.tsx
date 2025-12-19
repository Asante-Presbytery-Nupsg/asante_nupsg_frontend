import { UserTable } from "@/dashboard/main/UserTable";
import type { UserType } from "@/schema/userSchema";

interface UserSectionProps {
  users: UserType[];
  isLoading: boolean;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSearchChange: (search: string) => void;
  onInstitutionChange: (id: string | undefined) => void;
  onPresbyteryChange: (id: string | undefined) => void;
  allInstitutions?: Array<{ id: string; name: string }>;
  allPresbyteries?: Array<{ id: string; name: string }>;
  onExport: (format: "csv" | "xlsx") => Promise<void>;
  onInstitutionSearch: (search: string) => void;
  onPresbyterySearch: (search: string) => void;
  isLoadingInstitutions?: boolean;
  isLoadingPresbyteries?: boolean;
}

const UserSection: React.FC<UserSectionProps> = ({
  users,
  isLoading,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
  onInstitutionChange,
  onPresbyteryChange,
  allInstitutions,
  allPresbyteries,
  onExport,
  onInstitutionSearch,
  onPresbyterySearch,
  isLoadingInstitutions,
  isLoadingPresbyteries,
}) => {
  return (
    <div className="mt-5">
      <div className="bg-gray-100/60">
        <div className="border p-5 rounded-xs flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-blue-950">User Data</h2>
            <p className="text-sm text-gray-500">View and manage users.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200 text-white px-4 py-2 text-sm rounded-xs mt-4">
            New User
          </button>
        </div>
      </div>

      <div className="border mt-2 p-5">
        <UserTable
          users={users}
          isLoading={isLoading}
          totalCount={totalCount}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSearchChange={onSearchChange}
          onInstitutionChange={onInstitutionChange}
          onPresbyteryChange={onPresbyteryChange}
          allInstitutions={allInstitutions}
          allPresbyteries={allPresbyteries}
          onExport={onExport}
          onInstitutionSearch={onInstitutionSearch}
          onPresbyterySearch={onPresbyterySearch}
          isLoadingInstitutions={isLoadingInstitutions}
          isLoadingPresbyteries={isLoadingPresbyteries}
        />
      </div>
    </div>
  );
};

export default UserSection;
