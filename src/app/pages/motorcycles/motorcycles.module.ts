import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotorcycleesRoutingModule } from './motorcycles-routing.module';
import { MotorcyclesManageComponent } from './motorcycles-manage/motorcycles-manage.component';
import { MotorcycleListComponent } from './motorcycles-list/motorcycles-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MotorcycleesRoutingModule,
    MotorcycleListComponent,
    MotorcyclesManageComponent,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MotorcyclesModule { }
