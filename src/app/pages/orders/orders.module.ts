import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './orders-list/orders-list.component';
import { OrdersManageComponent } from './orders-manage/orders-manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    OrderListComponent,
    OrdersManageComponent,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OrdersModule { }
