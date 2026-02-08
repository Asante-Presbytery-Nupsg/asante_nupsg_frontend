import { useState, useMemo } from "react";
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
import { mockShepherds, mockBranches } from "./data/mockData";
import { Search, Plus, User, ArrowUpDown } from "lucide-react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    ColumnDef,
} from "@tanstack/react-table";
import type { Shepherd } from "./data/types";

const ShepherdList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [sorting, setSorting] = useState([{ id: "name", desc: false }]);
    const [globalFilter, setGlobalFilter] = useState("");

    const handleAddShepherd = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAddOpen(false);
        alert("Shepherd added successfully! (Mock Action)");
    };

    const columns = useMemo<ColumnDef<Shepherd>[]>(
        () => [
            {
                id: "shepherd",
                header: "Shepherd",
                accessorKey: "name",
                cell: ({ row }) => (
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 shadow-inner border border-blue-200">
                            <span className="font-bold text-sm">{row.original.name.charAt(0)}</span>
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">{row.original.name}</div>
                            <div className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">
                                {row.original.assignedSheepIds.length} Sheep Assigned
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                id: "contact",
                header: "Contact Info",
                cell: ({ row }) => (
                    <div className="space-y-1">
                        <div className="text-sm text-gray-700">{row.original.contact}</div>
                        <div className="text-xs text-gray-500">{row.original.email}</div>
                    </div>
                ),
            },
            {
                id: "branch",
                header: "Branch",
                accessorKey: "branchId",
                cell: ({ row }) => (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                        CB-{row.original.branchId.split('-')[1]}
                    </span>
                ),
            },
            {
                id: "status",
                header: "Role",
                cell: () => (
                    <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                        Active
                    </span>
                ),
            },
            {
                id: "actions",
                header: () => <div className="text-right">Actions</div>,
                cell: ({ row }) => (
                    <div className="text-right">
                        <Link
                            to={row.original.id}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline underline-offset-4"
                        >
                            View Details
                        </Link>
                    </div>
                ),
            },
        ],
        []
    );

    const filteredData = useMemo(() => {
        return mockShepherds.filter((shepherd) =>
            shepherd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shepherd.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shepherd.contact.includes(searchTerm)
        );
    }, [searchTerm]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shepherds</h2>
                    <p className="text-gray-500 text-sm">Manage and monitor all shepherds.</p>
                </div>

                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                            <Plus className="mr-2 h-4 w-4" /> Add Shepherd
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <form onSubmit={handleAddShepherd}>
                            <DialogHeader>
                                <DialogTitle>Add New Shepherd</DialogTitle>
                                <DialogDescription>
                                    Enter the details of the new shepherd to add them to the system.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="e.g. Kwame Asante" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="contact">Phone Contact</Label>
                                        <Input id="contact" placeholder="050..." required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="example@nupsg.com" />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="branch">Coordinating Branch</Label>
                                    <Select required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Branch" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockBranches.map(branch => (
                                                <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create Shepherd</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300">
                <Search className="h-4 w-4 text-gray-400 ml-2" />
                <Input
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-gray-50/50 hover:bg-gray-50/50 border-b-gray-100">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center gap-2">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getCanSort() && (
                                                <ArrowUpDown className="h-4 w-4 opacity-50" />
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="hover:bg-blue-50/30 transition-colors">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-32 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <User className="h-8 w-8 text-gray-300" />
                                        <p>No shepherds found matching "{searchTerm}"</p>
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

export default ShepherdList;
