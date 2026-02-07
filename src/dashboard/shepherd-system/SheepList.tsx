import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockSheep, mockShepherds } from "./data/mockData";
import { Search, Plus, User, Filter } from "lucide-react";

const SheepList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [yearFilter, setYearFilter] = useState<string>("all");
    const [isAddOpen, setIsAddOpen] = useState(false);

    const filteredSheep = mockSheep.filter((sheep) => {
        const matchesSearch = sheep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sheep.program.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = yearFilter === "all" || (sheep.year?.toString() || "") === yearFilter;
        return matchesSearch && matchesYear;
    });

    const getShepherdName = (id: string) => {
        return mockShepherds.find(s => s.id === id)?.name || "Unknown";
    };

    const handleAddSheep = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAddOpen(false);
        alert("Sheep added successfully! (Mock Action)");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Sheep</h2>
                    <p className="text-gray-500 text-sm">Directory of all sheep and their shepherds.</p>
                </div>

                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                            <Plus className="mr-2 h-4 w-4" /> Add Sheep
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <form onSubmit={handleAddSheep}>
                            <DialogHeader>
                                <DialogTitle>Add New Sheep</DialogTitle>
                                <DialogDescription>
                                    Register a new sheep and assign them to a shepherd.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="e.g. Yaw Boateng" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="program">Program</Label>
                                        <Input id="program" placeholder="e.g. BSc Admin" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="year">Year</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Year 1</SelectItem>
                                                <SelectItem value="2">Year 2</SelectItem>
                                                <SelectItem value="3">Year 3</SelectItem>
                                                <SelectItem value="4">Year 4</SelectItem>
                                                <SelectItem value="5">Year 5+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="residence">Residence / Hostel</Label>
                                    <Input id="residence" placeholder="e.g. Legon Hall" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="contact">Phone Contact</Label>
                                    <Input id="contact" placeholder="050..." required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="shepherd">Assign Shepherd</Label>
                                    <Select required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Shepherd" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockShepherds.map(shep => (
                                                <SelectItem key={shep.id} value={shep.id}>{shep.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Add Sheep</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300">
                    <Search className="h-4 w-4 text-gray-400 ml-2" />
                    <Input
                        placeholder="Search by name or program..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                    />
                </div>
                {/* Replaced native select with Shadcn Select for consistency, or keep style wrapper */}
                <div className="w-full sm:w-[150px]">
                    <Select value={yearFilter} onValueChange={setYearFilter}>
                        <SelectTrigger className="w-full h-full min-h-[42px]">
                            <Filter className="w-3 h-3 mr-2" />
                            <SelectValue placeholder="Filter Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Years</SelectItem>
                            <SelectItem value="1">Year 1</SelectItem>
                            <SelectItem value="2">Year 2</SelectItem>
                            <SelectItem value="3">Year 3</SelectItem>
                            <SelectItem value="4">Year 4</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-b-gray-100">
                            <TableHead className="font-semibold text-gray-600">Sheep Name</TableHead>
                            <TableHead className="font-semibold text-gray-600">Details</TableHead>
                            <TableHead className="font-semibold text-gray-600">Assigned Shepherd</TableHead>
                            <TableHead className="font-semibold text-gray-600">Status</TableHead>
                            <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSheep.map((sheep) => (
                            <TableRow key={sheep.id} className="hover:bg-blue-50/30 transition-colors">
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-green-700 shadow-inner border border-green-200">
                                            <span className="font-bold text-sm">{sheep.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{sheep.name}</div>
                                            <div className="text-xs text-gray-500">{sheep.program}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <div className="text-sm text-gray-700 flex items-center gap-1.5">
                                            <span className="font-medium text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                                                {sheep.year ? `YR ${sheep.year}` : 'N/A'}
                                            </span>
                                            <span>{sheep.residence}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">{sheep.contact}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        to={`/dashboard/shepherd/shepherds/${sheep.shepherdId}`}
                                        className="inline-flex items-center gap-2 group"
                                    >
                                        <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold border border-blue-100">
                                            {getShepherdName(sheep.shepherdId).charAt(0)}
                                        </div>
                                        <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                                            {getShepherdName(sheep.shepherdId)}
                                        </span>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                        Active
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link
                                        to={sheep.id}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline underline-offset-4"
                                    >
                                        View Profile
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredSheep.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <User className="h-8 w-8 text-gray-300" />
                                        <p>No sheep found.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default SheepList;
