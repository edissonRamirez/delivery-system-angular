import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../models/TableColumn';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent<T>  {

  @Input() columns: TableColumn<T>[] = [];
  @Input() data: T[] = [];
  @Input() actionsTemplate?: TemplateRef<any>;
  @Input() headerActions?: TemplateRef<any>;

  @Input() title: string = 'Listado';
  @Input() singular: string = '';

  /** Vista actual (table/cards) */
  viewMode: 'table' | 'cards' = 'table';

  toggleView(mode: 'table' | 'cards') {
    this.viewMode = mode;
  }

  getFieldValue(item: any, field: string) {
    return item[field];
  }
}
