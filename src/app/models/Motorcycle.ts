import { Issue } from "./Issue";
import { Order } from "./Order";
import { Shift } from "./Shift";

export class Motorcycle {
    id?: number;
    license_plate?: string;
    brand?: string;
    year?: number;
    status?: string;

    // One to Many Relationships
    orders?: Order[];
    shifts?: Shift[];
    issues?: Issue[];
}