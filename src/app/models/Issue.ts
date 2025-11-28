import { Motorcycle } from "./Motorcycle";
import { Photo } from "./Photo";

export class Issue {
    id?: number;
    description: string;
    issue_type: string;
    date_reported: Date;
    status?: string;

    // One to One Relationships
    motorcycle_id?: number;
    motorcycle?: Motorcycle;

    // One to Many Relationships
    photos?: Photo[];
}