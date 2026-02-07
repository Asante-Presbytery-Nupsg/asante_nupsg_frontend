import { useState } from "react";
import { mockReports, mockShepherds, mockSheep } from "./data/mockData";
import { Card, CardContent } from "@/components/ui/card";
// Table imports removed
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Filter, Calendar } from "lucide-react";

const Reports = () => {
    const [filterType, setFilterType] = useState<string>("ALL");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Filter Logic
    const filteredReports = mockReports.filter(report => {
        if (filterType === "ALL") return true;
        return report.type === filterType;
    });

    // Helper to get names
    const getAuthorName = (id: string, type: string) => {
        if (type === "SHEPHERD_TO_SHEEP") {
            return mockShepherds.find(s => s.id === id)?.name || "Unknown Shepherd";
        }
        return mockSheep.find(s => s.id === id)?.name || "Unknown Sheep";
    };

    const getSubjectName = (id: string, type: string) => {
        if (type === "SHEPHERD_TO_SHEEP") {
            return mockSheep.find(s => s.id === id)?.name || "Unknown Sheep";
        }
        return mockShepherds.find(s => s.id === id)?.name || "Unknown Shepherd";
    };

    const handleSubmitReport = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate loading/saving
        setTimeout(() => {
            setIsDialogOpen(false);
            alert("Report submitted successfully! (Mock Action)");
        }, 500);
    };

    return (
        <div className="space-y-6">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Report Center</h2>
                    <p className="text-gray-500 text-sm mt-1">Track feedback loops between Shepherds and Sheep.</p>
                </div>
                <div className="flex gap-2">
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-[180px]">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Filter by Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Reports</SelectItem>
                            <SelectItem value="SHEPHERD_TO_SHEEP">Shepherd Reports</SelectItem>
                            <SelectItem value="SHEEP_TO_SHEPHERD">Sheep Feedback</SelectItem>
                        </SelectContent>
                    </Select>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="mr-2 h-4 w-4" /> New Report
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <form onSubmit={handleSubmitReport}>
                                <DialogHeader>
                                    <DialogTitle>Submit New Report</DialogTitle>
                                    <DialogDescription>
                                        Record a new interaction or feedback.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="report-type">Report Type</Label>
                                        <Select defaultValue="SHEPHERD_TO_SHEEP">
                                            <SelectTrigger id="report-type">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="SHEPHERD_TO_SHEEP">Shepherd Report (on Sheep)</SelectItem>
                                                <SelectItem value="SHEEP_TO_SHEPHERD">Sheep Feedback (on Shepherd)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="comments">Comments / Notes</Label>
                                        <Textarea id="comments" placeholder="Enter detailed notes here..." required />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Submit Report</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Reports List */}
            <div className="grid gap-4">
                {filteredReports.map((report) => (
                    <Card key={report.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${report.type === "SHEPHERD_TO_SHEEP" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                                        }`}>
                                        {getAuthorName(report.authorId, report.type).charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {getAuthorName(report.authorId, report.type)}
                                            <span className="text-gray-400 font-normal text-sm mx-1">reported on</span>
                                            {getSubjectName(report.subjectId, report.type)}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(report.date).toLocaleDateString()} at {new Date(report.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${report.type === "SHEPHERD_TO_SHEEP"
                                    ? "bg-blue-50 text-blue-700 border-blue-100"
                                    : "bg-green-50 text-green-700 border-green-100"
                                    }`}>
                                    {report.type === "SHEPHERD_TO_SHEEP" ? "Pastoral Report" : "Member Feedback"}
                                </span>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
                                {report.content.attendance && (
                                    <div className="mb-2">
                                        <span className="font-semibold text-gray-900">Attendance:</span> {report.content.attendance}
                                    </div>
                                )}
                                <p className="italic">"{report.content.comments}"</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Reports;
