import { Department } from "./Department";
import { Shift } from "./Shift";
import { WorkArea } from "./WorkArea";

export interface Driver {
    id: number;
    name: string;
    license_number: string;
    phone: string;
    email: string;
    status: string;

    // One to One Relationships
    department_id?: number;
    department?: Department;

    // One to Many Relationships
    shifts?: Shift[];
    // work_areas?: WorkArea[];
    
}
