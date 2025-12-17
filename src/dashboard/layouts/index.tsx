import { Outlet } from "react-router-dom";
import Logo from "../../assets/NUPSGLOGO.svg";

const DashLayout = () => {
  return (
    <div>
      <header className="bg-gray-50/20 backdrop-blur-md py-4 border-b px-5 flex items-center justify-between sticky top-0 z-50 ">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="NUPS-G Logo" className="w-6 sm:w-8" />
          <div className="-space-y-1.5">
            <h2 className="font-bold text-base sm:text-lg capitalize tracking-wider text-gray-700">
              Admin Panel
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Sponsored by His Grace
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-9 w-9 border rounded-full bg-gray-100">
            <img
              src="/images/avatar.webp"
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="-space-y-0.5">
            <p className="font-semibold text-sm text-gray-700">Hi Admin</p>
            <p className="text-xs text-gray-500 font-medium">KNUST-CB</p>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashLayout;
