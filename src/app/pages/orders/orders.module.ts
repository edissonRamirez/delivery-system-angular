import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersManageComponent } from './orders-manage/orders-manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersAssignMotoComponent } from './orders-assign-moto/orders-assign-moto.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    OrdersListComponent,
    OrdersManageComponent,
    FormsModule,
    ReactiveFormsModule,
    OrdersAssignMotoComponent
  ]
})
export class OrdersModule { }
