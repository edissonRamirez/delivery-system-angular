import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersManageComponent } from './customers-manage/customers-manage.component';


@NgModule({
  declarations: [],
  imports: [
    CustomersListComponent,
    CommonModule,
    CustomersRoutingModule,
    CustomersManageComponent
  ]
})
export class CustomersModule { }
