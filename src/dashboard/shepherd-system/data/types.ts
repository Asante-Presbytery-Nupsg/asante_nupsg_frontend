export interface CoordinatingBranch {
    id: string;
    name: string;
    shepherdCount: number;
    sheepCount: number;
    totalReports: number;
}

export interface Shepherd {
    id: string;
    name: string;
    contact: string;
    email: string;
    branchId: string;
    assignedSheepIds: string[];
    avatarUrl?: string; // Optional for UI
}

export interface Sheep {
    id: string;
    name: string;
    contact: string;
    program: string; // e.g., "BSc Computer Science"
    residence: string; // e.g., "Legon Hall"
    shepherdId: string;
    avatarUrl?: string;
    year?: number;
}

export interface Report {
    id: string;
    type: 'SHEPHERD_TO_SHEEP' | 'SHEEP_TO_SHEPHERD';
    authorId: string;
    subjectId: string;
    date: string; // ISO string
    content: {
        // Shepherd -> Sheep
        attendance?: string;
        spiritualGrowth?: string;
        welfare?: string;

        // Sheep -> Shepherd
        supportRating?: number; // 1-5
        communicationQuality?: number; // 1-5

        // General
        comments: string;
    };
}
