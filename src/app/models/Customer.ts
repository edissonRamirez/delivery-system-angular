import { Order } from "./Order";

export class Customer {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;

    // One to Many Relationships
    orders?: Order[];
}