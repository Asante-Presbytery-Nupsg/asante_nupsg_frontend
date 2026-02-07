import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockShepherds, mockSheep, mockReports } from "./data/mockData";
import { Phone, MapPin, ChevronLeft, GraduationCap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SheepDetail = () => {
    const { id } = useParams();
    const sheep = mockSheep.find((s) => s.id === id);
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

    if (!sheep) {
        return <div>Sheep not found</div>;
    }

    const shepherd = mockShepherds.find(s => s.id === sheep.shepherdId);
    const reports = mockReports.filter(
        (r) => r.authorId === sheep.id || r.subjectId === sheep.id
    );

    const handleSubmitReport = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            setIsReportDialogOpen(false);
            alert(`Report for ${sheep.name} submitted successfully! (Mock Action)`);
        }, 500);
    };

    return (
        <div className="space-y-6">
            <Link
                to="/dashboard/shepherd/sheep"
                className="flex items-center text-sm text-gray-500 hover:text-gray-900"
            >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Sheep
            </Link>

            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-4xl font-bold border-4 border-white shadow-sm">
                    {sheep.name.charAt(0)}
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">{sheep.name}</h1>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {sheep.contact}
                        </div>
                        <div className="flex items-center">
                            <GraduationCap className="h-4 w-4 mr-2" />
                            {sheep.program} (Year {sheep.year})
                        </div>
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {sheep.residence}
                        </div>
                    </div>
                </div>
                <div>
                    <Button onClick={() => alert("Edit Profile: This feature is simulated.")}>Edit Profile</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Assigned Shepherd</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {shepherd ? (
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                    {shepherd.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">{shepherd.name}</p>
                                    <p className="text-sm text-gray-500">{shepherd.contact}</p>
                                </div>
                                <Button variant="outline" size="sm" className="ml-auto" asChild>
                                    <Link to={`/dashboard/shepherd/shepherds/${shepherd.id}`}>View Profile</Link>
                                </Button>
                            </div>
                        ) : (
                            <p>No shepherd assigned.</p>
                        )}
                    </CardContent>
                </Card>

                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-full">
                                    <Plus className="mr-2 h-4 w-4" /> Submit Report
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <form onSubmit={handleSubmitReport}>
                                    <DialogHeader>
                                        <DialogTitle>Submit Report for {sheep.name}</DialogTitle>
                                        <DialogDescription>
                                            Record a pastoral visit or feedback for this member.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="detail-report-type">Report Type</Label>
                                            <Select defaultValue="SHEPHERD_TO_SHEEP">
                                                <SelectTrigger id="detail-report-type">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="SHEPHERD_TO_SHEEP">Shepherd Report (on Sheep)</SelectItem>
                                                    <SelectItem value="SHEEP_TO_SHEPHERD">Sheep Feedback (on Shepherd)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="detail-comments">Comments / Notes</Label>
                                            <Textarea id="detail-comments" placeholder="Enter detailed notes here..." required />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Submit Report</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <Button variant="secondary" className="w-full" onClick={() => alert("Transfer Sheep: This administrative action is simulated.")}>
                            Transfer Sheep
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="reports" className="w-full">
                <TabsList>
                    <TabsTrigger value="reports">Report History</TabsTrigger>
                </TabsList>
                <TabsContent value="reports" className="mt-4">
                    <Card>
                        <CardContent className="pt-6">
                            <ul className="space-y-4">
                                {reports.map((report) => (
                                    <li key={report.id} className="border-l-4 border-green-500 pl-4 py-1">
                                        <div className="flex justify-between">
                                            <p className="font-semibold text-sm">
                                                {report.type === 'SHEPHERD_TO_SHEEP' ? 'Shepherd Report' : 'Feedback from Sheep'}
                                            </p>
                                            <span className="text-xs text-gray-500">{new Date(report.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="mt-1 text-sm text-gray-600">
                                            {report.content.attendance && <p><span className="font-medium">Attendance:</span> {report.content.attendance}</p>}
                                            {report.content.spiritualGrowth && <p><span className="font-medium">Growth:</span> {report.content.spiritualGrowth}</p>}
                                            <p className="mt-1 italic">"{report.content.comments}"</p>
                                        </div>
                                    </li>
                                ))}
                                {reports.length === 0 && <p className="text-gray-500 text-sm">No reports found.</p>}
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SheepDetail;
