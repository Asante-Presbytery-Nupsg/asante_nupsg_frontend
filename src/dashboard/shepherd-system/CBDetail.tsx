import { useParams, Link } from "react-router-dom";
import { mockBranches, mockShepherds } from "./data/mockData";
import { Building2, ChevronLeft, User } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const CBDetail = () => {
    const { id } = useParams();
    const branch = mockBranches.find((b) => b.id === id);

    if (!branch) {
        return <div>Branch not found</div>;
    }

    const shepherds = mockShepherds.filter((s) => s.branchId === branch.id);

    return (
        <div className="space-y-6">
            <Link
                to="/dashboard/shepherd/cbs"
                className="flex items-center text-sm text-gray-500 hover:text-gray-900"
            >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Branches
            </Link>

            <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-blue-100 flex items-center justify-center text-blue-700">
                    <Building2 className="h-8 w-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{branch.name}</h1>
                    <p className="text-gray-500">Coordinating Branch</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-xl border shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Total Shepherds</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{branch.shepherdCount}</p>
                </div>
                <div className="p-6 bg-white rounded-xl border shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Total Sheep</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{branch.sheepCount}</p>
                </div>
                <div className="p-6 bg-white rounded-xl border shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Total Reports</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{branch.totalReports}</p>
                </div>
            </div>

            <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Shepherds in {branch.name}</h3>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Assigned Sheep</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {shepherds.map((shepherd) => (
                            <TableRow key={shepherd.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">{shepherd.name}</div>
                                            <div className="text-xs text-gray-500">{shepherd.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{shepherd.contact}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {shepherd.assignedSheepIds.length} Sheep
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to={`/dashboard/shepherd/shepherds/${shepherd.id}`}>View</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {shepherds.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No shepherds found in this branch.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default CBDetail;
