import { useParams, Link } from "react-router-dom";
import { mockShepherds, mockSheep, mockReports } from "./data/mockData";
import { User, Phone, Mail, MapPin, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ShepherdDetail = () => {
    const { id } = useParams();
    const shepherd = mockShepherds.find((s) => s.id === id);

    if (!shepherd) {
        return <div>Shepherd not found</div>;
    }

    const assignedSheep = mockSheep.filter((s) =>
        shepherd.assignedSheepIds.includes(s.id)
    );

    const reports = mockReports.filter(
        (r) => r.authorId === shepherd.id || r.subjectId === shepherd.id
    );

    return (
        <div className="space-y-6">
            <Link
                to="/dashboard/shepherd/shepherds"
                className="flex items-center text-sm text-gray-500 hover:text-gray-900"
            >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Shepherds
            </Link>

            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-4xl font-bold border-4 border-white shadow-sm">
                    {shepherd.name.charAt(0)}
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">{shepherd.name}</h1>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {shepherd.contact}
                        </div>
                        <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {shepherd.email}
                        </div>
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            Branch: {shepherd.branchId}
                        </div>
                    </div>
                </div>
                <div>
                    <Button onClick={() => alert("Edit Profile: This feature is simulated.")}>Edit Profile</Button>
                </div>
            </div>

            <Tabs defaultValue="sheep" className="w-full">
                <TabsList>
                    <TabsTrigger value="sheep">Assigned Sheep ({assignedSheep.length})</TabsTrigger>
                    <TabsTrigger value="reports">Recent Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="sheep" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {assignedSheep.map((sheep) => (
                            <Card key={sheep.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">{sheep.name}</CardTitle>
                                        <p className="text-xs text-muted-foreground">{sheep.program}</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm text-gray-500 space-y-1">
                                        <p className="flex items-center gap-2">
                                            <Phone className="h-3 w-3" /> {sheep.contact}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <MapPin className="h-3 w-3" /> {sheep.residence}
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                                        <Link to={`/dashboard/shepherd/sheep/${sheep.id}`}>View Profile</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="reports" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Reports History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {reports.map((report) => (
                                    <li key={report.id} className="border-l-4 border-blue-500 pl-4 py-1">
                                        <div className="flex justify-between">
                                            <p className="font-semibold text-sm">
                                                {report.type === 'SHEPHERD_TO_SHEEP' ? 'Filed a report' : 'Received feedback'}
                                            </p>
                                            <span className="text-xs text-gray-500">{new Date(report.date).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mt-1">{report.content.comments}</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ShepherdDetail;
