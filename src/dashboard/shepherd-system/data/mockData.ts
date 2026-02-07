import type { CoordinatingBranch, Shepherd, Sheep, Report } from "./types";

export const mockBranches: CoordinatingBranch[] = [
    { id: "cb-1", name: "Legon", shepherdCount: 5, sheepCount: 30, totalReports: 120 },
    { id: "cb-2", name: "KNUST", shepherdCount: 8, sheepCount: 45, totalReports: 200 },
    { id: "cb-3", name: "UCC", shepherdCount: 4, sheepCount: 20, totalReports: 80 },
];

export const mockShepherds: Shepherd[] = [
    {
        id: "shep-1",
        name: "Kwame Asante",
        contact: "0201234567",
        email: "kwame.asante@example.com",
        branchId: "cb-1",
        assignedSheepIds: ["sheep-1", "sheep-2", "sheep-3"],
    },
    {
        id: "shep-2",
        name: "Ama Osei",
        contact: "0249876543",
        email: "ama.osei@example.com",
        branchId: "cb-1",
        assignedSheepIds: ["sheep-4", "sheep-5"],
    },
    {
        id: "shep-3",
        name: "Kofi Mensah",
        contact: "0501122334",
        email: "kofi.mensah@example.com",
        branchId: "cb-2",
        assignedSheepIds: ["sheep-6"],
    },
];

export const mockSheep: Sheep[] = [
    {
        id: "sheep-1",
        name: "Yaw Boateng",
        contact: "0555555555",
        program: "BSc Computer Science",
        residence: "Legon Hall",
        shepherdId: "shep-1",
        year: 2,
    },
    {
        id: "sheep-2",
        name: "Akosua Agyapong",
        contact: "0277777777",
        program: "BA Economics",
        residence: "Volta Hall",
        shepherdId: "shep-1",
        year: 1,
    },
    {
        id: "sheep-3",
        name: "Kojo Antwi",
        contact: "0244444444",
        program: "BSc Engineering",
        residence: "Commonwealth Hall",
        shepherdId: "shep-1",
        year: 3,
    },
    {
        id: "sheep-4",
        name: "Abena Kyei",
        contact: "0266666666",
        program: "BSc Nursing",
        residence: "Sarbah Hall",
        shepherdId: "shep-2",
        year: 2,
    },
    {
        id: "sheep-5",
        name: "Eesi Mensah",
        contact: "0233333333",
        program: "BSc Admin",
        residence: "Limann Hall",
        shepherdId: "shep-2",
        year: 4,
    },
    {
        id: "sheep-6",
        name: "Fiifi Coleman",
        contact: "0544444444",
        program: "BSc Architecture",
        residence: "Unity Hall",
        shepherdId: "shep-3",
        year: 2,
    },
];

export const mockReports: Report[] = [
    // Shepherd -> Sheep reports
    {
        id: "rep-1",
        type: "SHEPHERD_TO_SHEEP",
        authorId: "shep-1",
        subjectId: "sheep-1",
        date: "2023-10-25T10:00:00Z",
        content: {
            attendance: "Regular",
            spiritualGrowth: "Growing steadily, attending bible studies.",
            welfare: "Good",
            comments: "Yaw is doing well.",
        },
    },
    {
        id: "rep-2",
        type: "SHEPHERD_TO_SHEEP",
        authorId: "shep-2",
        subjectId: "sheep-4",
        date: "2023-10-26T14:30:00Z",
        content: {
            attendance: "Irregular",
            spiritualGrowth: "Need encouragement.",
            welfare: "Stressed with exams",
            comments: "Planning a visit soon.",
        },
    },
    // Sheep -> Shepherd reports
    {
        id: "rep-3",
        type: "SHEEP_TO_SHEPHERD",
        authorId: "sheep-1",
        subjectId: "shep-1",
        date: "2023-10-27T09:15:00Z",
        content: {
            supportRating: 5,
            communicationQuality: 5,
            comments: "Shepherd Kwame is very supportive.",
        },
    },
];
