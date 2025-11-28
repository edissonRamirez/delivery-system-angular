import { Menu } from "./Menu";

export class Product{
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    category?: string;

    // One to Many Relationships
    menus?: Menu[];
}