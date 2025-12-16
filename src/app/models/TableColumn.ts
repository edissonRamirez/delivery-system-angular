import { TemplateRef } from "@angular/core";

export interface TableColumn<T> {
  header: string;
  field?: keyof T | string;
  template?: TemplateRef<any>;
  format?: 'currency' | 'date' | 'image' | 'uppercase' | 'lowercase';
}
