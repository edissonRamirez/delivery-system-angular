import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressesRoutingModule } from './addresses-routing.module';
import { AddressesListComponent } from './addresses-list/addresses-list.component';
import { AddressesManageComponent } from './addresses-manage/addresses-manage.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddressesRoutingModule,
    AddressesListComponent,
    AddressesManageComponent
  ]
})
export class AddressesModule { }
