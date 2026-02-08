import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { mockBranches, mockShepherds, mockSubBranches } from "./data/mockData";
import { Building2, ChevronLeft, User, ArrowUpDown } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AddSubBranchForm from "./AddSubBranchForm";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
} from "@tanstack/react-table";
import type { SubBranch, Shepherd } from "./data/types";

const CBDetail = () => {
    const { cbId } = useParams();
    const branch = mockBranches.find((b) => b.id === cbId);
    const [subBranchSorting, setSubBranchSorting] = useState([{ id: "name", desc: false }]);
    const [shepherdSorting, setShepherdSorting] = useState([{ id: "name", desc: false }]);

    if (!branch) {
        return <div>Branch not found</div>;
    }

    const shepherds = mockShepherds.filter((s) => s.branchId === branch.id);
    const subBranches = mockSubBranches.filter((sb) => sb.parentBranchId === branch.id);

    // Sub-Branch Table Columns
    const subBranchColumns = useMemo<ColumnDef<SubBranch>[]>(
        () => [
            {
                id: "name",
                header: "Name",
                accessorKey: "name",
            },
            {
                id: "location",
                header: "Location",
                accessorKey: "location",
                cell: ({ row }) => row.original.location || "-",
            },
            {
                id: "contact",
                header: "Contact",
                accessorKey: "contact",
                cell: ({ row }) => row.original.contact || "-",
            },
            {
                id: "actions",
                header: () => <div className="text-right">Actions</div>,
                cell: ({ row }) => (
                    <div className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                            <Link to={`/dashboard/shepherd/cbs/${cbId}/sub-branches/${row.original.id}`}>View</Link>
                        </Button>
                    </div>
                ),
            },
        ],
        [cbId]
    );

    // Shepherd Table Columns
    const shepherdColumns = useMemo<ColumnDef<Shepherd>[]>(
        () => [
            {
                id: "name",
                header: "Name",
                cell: ({ row }) => (
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="font-semibold">{row.original.name}</div>
                            <div className="text-xs text-gray-500">{row.original.email}</div>
                        </div>
                    </div>
                ),
            },
            {
                id: "contact",
                header: "Contact",
                accessorKey: "contact",
            },
            {
                id: "sheep",
                header: "Assigned Sheep",
                cell: ({ row }) => (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {row.original.assignedSheepIds.length} Sheep
                    </span>
                ),
            },
            {
                id: "actions",
                header: () => <div className="text-right">Actions</div>,
                cell: ({ row }) => (
                    <div className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                            <Link to={`/dashboard/shepherd/shepherds/${row.original.id}`}>View</Link>
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    const subBranchTable = useReactTable({
        data: subBranches,
        columns: subBranchColumns,
        state: {
            sorting: subBranchSorting,
        },
        onSortingChange: setSubBranchSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const shepherdTable = useReactTable({
        data: shepherds,
        columns: shepherdColumns,
        state: {
            sorting: shepherdSorting,
        },
        onSortingChange: setShepherdSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="space-y-6">
            <Link
                to="/dashboard/shepherd/cbs"
                className="flex items-center text-sm text-gray-500 hover:text-gray-900"
            >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Branches
            </Link>

            <div className="flex justify-between ">
                 <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-blue-100 flex items-center justify-center text-blue-700">
                    <Building2 className="h-8 w-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{branch.name}</h1>
                    <p className="text-gray-500">Coordinating Branch</p>
                </div>
                </div>
                <div className="mt-4">
                    <AddSubBranchForm parentBranchId={branch.id} parentBranchName={branch.name} />
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
                    <h3 className="text-lg font-semibold">Sub-Branches</h3>
                </div>
                {subBranches.length > 0 ? (
                    <Table>
                        <TableHeader>
                            {subBranchTable.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="bg-gray-50 hover:bg-gray-50">
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
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
                            {subBranchTable.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        <p>No sub-branches created yet.</p>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Shepherds in {branch.name}</h3>
                </div>
                <Table>
                    <TableHeader>
                        {shepherdTable.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-gray-50 hover:bg-gray-50">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
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
                        {shepherdTable.getRowModel().rows.length > 0 ? (
                            shepherdTable.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
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
