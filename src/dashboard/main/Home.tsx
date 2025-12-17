import { useQuery } from "@tanstack/react-query";
import { UserTable } from "./UserTable";
import { BASE_API } from "@/api/base";

const DashHome = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await BASE_API.get("/users", {
        withCredentials: true,
        params: { page: 1, limit: 10, search: "" },
      });
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  console.log(data.users);
  return (
    <div className="m-4 bg-white/35">
      <div className="border p-5 rounded-md">
        <h2 className="font-semibold text-blue-950">
          Welcome to the Admin Panel
        </h2>
        <p className="text-sm text-gray-500">
          This is where you can manage your NUPS-G website.
        </p>
      </div>

      {/* User table*/}
      <div>
        <div className="mt-10 bg-gray-100/60">
          <div className="border p-5 rounded-md">
            <h2 className="font-semibold text-blue-950">Users</h2>
            <p className="text-sm text-gray-500">View and manage users.</p>
          </div>
        </div>
        <div className="border mt-2 p-5">
          <UserTable users={data.users} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default DashHome;
