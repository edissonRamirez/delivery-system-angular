import { Component, Input, TemplateRef } from '@angular/core';
import { TableColumn } from '../../models/TableColumn';
import { CommonModule } from '@angular/common';

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

}
