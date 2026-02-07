import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Logo from "../../assets/NUPSGLOGO.svg";

const DashLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:ml-64 transition-all duration-300">
        <header className="bg-white/80 backdrop-blur-md py-4 border-b px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile toggle could go here */}
            <img src={Logo} alt="NUPS-G Logo" className="w-6 sm:w-8" />
          </div>
          <div className="flex-1"></div> {/* Spacer */}
          <div className="flex gap-4 items-center">
            <div className="hidden sm:block text-right">
              <p className="font-semibold text-sm text-gray-700">Patron View</p>
              <p className="text-xs text-gray-500 font-medium">Dashboard</p>
            </div>
            <div className="h-9 w-9 border rounded-full bg-gray-100 overflow-hidden">
              <img
                src="/images/avatar.webp"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
