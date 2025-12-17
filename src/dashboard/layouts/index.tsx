import { Outlet } from "react-router-dom";

const DashLayout = () => {
  return (
    <div>
      <header className="bg-gray-50 py-5 border-b px-5">
        <h2 className="font-bold text-lg capitalize tracking-wider">
          Admin Panel
        </h2>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashLayout;
