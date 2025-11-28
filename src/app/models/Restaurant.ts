import { Menu } from "./Menu";

export class Restaurant {
    id?: number;
    name?: string;
    address?: string;
    phone?: string;
    email?: string;

    // One to Many Relationships
    menus?: Menu[];

}