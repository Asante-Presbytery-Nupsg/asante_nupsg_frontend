import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, ClipboardList, Building2, UserCheck } from "lucide-react";
import Logo from "../../assets/NUPSGLOGO.svg";

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
            exact: true,
        },
        {
            label: "Shepherd Dashboard", // Renamed for clarity
            path: "/dashboard/shepherd",
            icon: LayoutDashboard,
            exact: true,
        },
        {
            label: "Branches",
            path: "/dashboard/shepherd/cbs",
            icon: Building2,
        },
        {
            label: "Shepherds",
            path: "/dashboard/shepherd/shepherds",
            icon: UserCheck,
        },
        {
            label: "Sheep",
            path: "/dashboard/shepherd/sheep",
            icon: Users,
        },
        {
            label: "Reports",
            path: "/dashboard/shepherd/reports",
            icon: ClipboardList,
        },
        // Add placeholders if needed, or link to existing pages if they existed
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-40">
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <img src={Logo} alt="NUPS-G Logo" className="w-8 h-8 mr-2" />
                <span className="font-bold text-lg text-gray-800 tracking-tight">Admin Panel</span>
            </div>

            <div className="flex-1 flex flex-col py-4 overflow-y-auto">
                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = item.exact
                            ? location.pathname === item.path
                            : location.pathname.startsWith(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                            >
                                <item.icon className={`mr-3 h-5 w-5 ${isActive
                                    ? "text-blue-700"
                                    : "text-gray-400 group-hover:text-gray-500"
                                    }`} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                        AD
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Admin User</p>
                        <p className="text-xs text-gray-500">Patron View</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
