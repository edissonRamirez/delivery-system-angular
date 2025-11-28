import { Order } from "./Order";
import { Product } from "./Product";
import { Restaurant } from "./Restaurant";

export class Menu {
    id?: number;
    price: number;
    availability?: boolean;
    
    

    // One to One Relationships
    restaurant_id?: number;
    restaurant?: Restaurant;
    product_id?: number;
    product?: Product;
    
    // One to Many Relationships
    orders?: Order[];
}