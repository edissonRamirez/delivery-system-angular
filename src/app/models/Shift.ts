import { Driver } from "./Driver";
import { Motorcycle } from "./Motorcycle";

export interface Shift {
  id: number;
  start_time: string;  // datetime
  end_time: string;    // datetime
  status: string;

  // One to One Relationships
  driver_id: number;
  driver?: Driver;
  motorcycle_id: number;
  motorcycle?: Motorcycle;
}
