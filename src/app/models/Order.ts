import { Address } from "./Address";
import { Customer } from "./Customer";
import { Menu } from "./Menu";
import { Motorcycle } from "./Motorcycle";

export class Order {
    id?: number;
    quantity?: number;
    total_price?: number;
    status?: string;

    // One to One Relationships
    customer_id?: number;
    customer?: Customer;
    customer_name?: string;
    customer_phone?: string;
    customer_email?: string;

    menu_id?: number;
    menu?: Menu;
    restaurant_name?: string;
    product_name?: string;
    product_price?: number;

    motorcycle_id?: number;
    motorcycle?: Motorcycle;
    motorcycle_plate?: string;

    address_id?: number;
    address?: Address;
    address_street?: string;
    address_city?: string;
}