import { Order } from "./Order";

export class Address {
    id?: number;
    street?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    additional_info?: string;
    lat?: number;
    lng?: number;

    // One to One Relationships
    order_id?: number;
    order?: Order;
}