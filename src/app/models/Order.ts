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
    menu_id?: number;
    menu?: Menu;
    motorcycle_id?: number;
    motorcycle?: Motorcycle;
    address_id?: string;
    address?: Address;
}