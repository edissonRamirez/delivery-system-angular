import { Issue } from "./Issue";

export class Photo {
    id?: number;
    image_url: string;
    caption?: string;
    taken_at?: Date;

    // One to One Relationships
    issue_id?: number;
    issue?: Issue;
}