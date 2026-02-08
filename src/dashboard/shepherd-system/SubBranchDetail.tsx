import { useParams, Link } from "react-router-dom";
import { mockBranches, mockSubBranches } from "./data/mockData";
import { Building2, ChevronLeft, MapPin, Phone } from "lucide-react";

const SubBranchDetail = () => {
    const { cbId, subBranchId } = useParams();
    const parentBranch = mockBranches.find((b) => b.id === cbId);
    const subBranch = mockSubBranches.find((sb) => sb.id === subBranchId && sb.parentBranchId === cbId);

    if (!parentBranch || !subBranch) {
        return (
            <div className="space-y-4">
                <Link
                    to="/dashboard/shepherd/cbs"
                    className="flex items-center text-sm text-gray-500 hover:text-gray-900"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Branches
                </Link>
                <div className="text-center text-gray-500">Sub-branch not found</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link to="/dashboard/shepherd/cbs" className="hover:text-gray-900">
                    <ChevronLeft className="h-4 w-4 inline mr-1" /> Branches
                </Link>
                <span>/</span>
                <Link to={`/dashboard/shepherd/cbs/${cbId}`} className="hover:text-gray-900">
                    {parentBranch.name}
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">{subBranch.name}</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-purple-100 flex items-center justify-center text-purple-700">
                    <Building2 className="h-8 w-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{subBranch.name}</h1>
                    <p className="text-gray-500">Sub-Branch of {parentBranch.name}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-xl border shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <p className="text-sm font-medium text-gray-500">Location</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{subBranch.location || "Not specified"}</p>
                </div>
                <div className="p-6 bg-white rounded-xl border shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <p className="text-sm font-medium text-gray-500">Contact</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{subBranch.contact || "Not specified"}</p>
                </div>
            </div>

            <div className="bg-white rounded-md border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Sub-Branch Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Branch ID</p>
                        <p className="font-mono text-gray-900 bg-gray-50 p-2 rounded">{subBranch.id}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Parent Branch</p>
                        <p className="text-gray-900 font-medium">{parentBranch.name}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-md border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="flex gap-3">
                    <Link to={`/dashboard/shepherd/cbs/${cbId}`}>
                        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-md font-medium transition-colors">
                            Back to {parentBranch.name}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SubBranchDetail;
