import { Driver } from "./Driver";

export class WorkArea {
    id: number;
    date: string; // Datetime

    // One to One Relationships
    driver_id?: number;
    driver?: Driver;
}