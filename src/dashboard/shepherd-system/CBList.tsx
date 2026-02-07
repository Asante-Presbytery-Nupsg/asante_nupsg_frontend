import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { mockBranches } from "./data/mockData";
import { Search, Building2, Users, UserCheck } from "lucide-react";

const CBList = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBranches = mockBranches.filter((branch) =>
        branch.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Coordinating Branches</h2>
                {/* <Button>Add Branch</Button> */}
            </div>

            <div className="flex items-center space-x-2 bg-white p-2 rounded-md border border-gray-200">
                <Search className="h-4 w-4 text-gray-500 ml-2" />
                <Input
                    placeholder="Search branches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBranches.map((branch) => (
                    <Link key={branch.id} to={branch.id}>
                        <Card className="hover:shadow-md transition-all cursor-pointer h-full border-2 border-transparent hover:border-blue-100">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xl font-bold">{branch.name}</CardTitle>
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                                    <Building2 className="h-4 w-4" />
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="flex justify-between items-end mb-2">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold">{branch.shepherdCount}</span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <UserCheck className="h-3 w-3" /> Shepherds
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-2xl font-bold">{branch.sheepCount}</span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Users className="h-3 w-3" /> Sheep
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
                                    <span>{branch.totalReports} total reports</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CBList;
