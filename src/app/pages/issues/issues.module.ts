import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuesRoutingModule } from './issues-routing.module';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { IssuesManageComponent } from './issues-manage/issues-manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MotorcyclesManageComponent } from '../motorcycles/motorcycles-manage/motorcycles-manage.component';
import { MotorcycleListComponent } from '../motorcycles/motorcycles-list/motorcycles-list.component';
import { MotorcycleesRoutingModule } from '../motorcycles/motorcycles-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IssuesRoutingModule,
    IssuesListComponent,
    IssuesManageComponent,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class IssuesModule { }
