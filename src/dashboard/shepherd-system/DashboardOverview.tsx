import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, ScrollText, Building2, Eye } from "lucide-react";
import { mockBranches, mockShepherds, mockSheep, mockReports } from "./data/mockData";

const DashboardOverview: React.FC = () => {
    const navigate = useNavigate();
    const totalShepherds = mockShepherds.length;
    const totalSheep = mockSheep.length;
    const totalReports = mockReports.length;
    const totalBranches = mockBranches.length;

    // const [simShepherd, setSimShepherd] = useState("");
    // const [simSheep, setSimSheep] = useState("");

    // const handleSimulateShepherd = () => {
    //     if (simShepherd) navigate(`/dashboard/shepherd/shepherds/${simShepherd}`);
    // };

    // const handleSimulateSheep = () => {
    //     if (simSheep) navigate(`/dashboard/shepherd/sheep/${simSheep}`);
    // };

    return (
        <div className="grid gap-6">
            {/* Simulation / Info Banner */}
            {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-blue-900 font-semibold flex items-center gap-2">
                        <Eye className="h-4 w-4" /> Simulate User Perspective
                    </h3>
                    <p className="text-sm text-blue-700 mt-1">
                        As a Patron, you can view the interface exactly as a specific Shepherd or Sheep sees it. Select a user below to jump to their profile.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="flex gap-2">
                        <Select value={simShepherd} onValueChange={setSimShepherd}>
                            <SelectTrigger className="w-[180px] bg-white">
                                <SelectValue placeholder="Select Shepherd" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockShepherds.map(s => (
                                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="bg-white text-blue-700 border-blue-200 hover:bg-blue-100" onClick={handleSimulateShepherd}>Go</Button>
                    </div>
                    <div className="flex gap-2">
                        <Select value={simSheep} onValueChange={setSimSheep}>
                            <SelectTrigger className="w-[180px] bg-white">
                                <SelectValue placeholder="Select Sheep" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockSheep.map(s => (
                                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="bg-white text-blue-700 border-blue-200 hover:bg-blue-100" onClick={handleSimulateSheep}>Go</Button>
                    </div>
                </div>
            </div> */}

            {/* Stats Cards - Clickable */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link to="/dashboard/shepherd/shepherds" className="block transition-transform hover:scale-[1.02]">
                    <Card className="h-full border-l-4 border-l-blue-500 hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Shepherds</CardTitle>
                            <UserCheck className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalShepherds}</div>
                            <p className="text-xs text-muted-foreground">Active mentors</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link to="/dashboard/shepherd/sheep" className="block transition-transform hover:scale-[1.02]">
                    <Card className="h-full border-l-4 border-l-green-500 hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Sheep</CardTitle>
                            <Users className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalSheep}</div>
                            <p className="text-xs text-muted-foreground">Being mentored</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link to="/dashboard/shepherd/cbs" className="block transition-transform hover:scale-[1.02]">
                    <Card className="h-full border-l-4 border-l-purple-500 hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Coordinating Branches</CardTitle>
                            <Building2 className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalBranches}</div>
                            <p className="text-xs text-muted-foreground">Active locations</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link to="/dashboard/shepherd/reports" className="block transition-transform hover:scale-[1.02]">
                    <Card className="h-full border-l-4 border-l-orange-500 hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                            <ScrollText className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalReports}</div>
                            <p className="text-xs text-muted-foreground">Submitted this month</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Recent Activity / Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Overview by Branch</CardTitle>
                        <CardDescription>Shepherd and Sheep distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockBranches.map((branch) => (
                                <div key={branch.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <Building2 className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium leading-none">{branch.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {branch.shepherdCount} Shepherds
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{branch.sheepCount}</p>
                                        <p className="text-xs text-muted-foreground">Sheep</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Reports Preview */}
                <Card className="col-span-1">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Recent Reports</CardTitle>
                                <CardDescription>Latest submissions</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/dashboard/shepherd/reports" className="text-blue-600 hover:text-blue-800">View All</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockReports.slice(0, 3).map((report) => (
                                <div key={report.id} className="flex flex-col space-y-1 border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-center">
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${report.type === 'SHEPHERD_TO_SHEEP'
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'bg-green-50 text-green-700'
                                            }`}>
                                            {report.type === 'SHEPHERD_TO_SHEEP' ? 'Shepherd Report' : 'Sheep Feedback'}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(report.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 truncate">
                                        {report.content.comments}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardOverview;
