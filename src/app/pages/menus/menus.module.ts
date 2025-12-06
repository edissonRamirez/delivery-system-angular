import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import { MenuListComponent } from './menus-list/menus-list.component';
import { MenusManageComponent } from './menus-manage/menus-manage.component';


@NgModule({
  declarations: [],
  imports: [
    MenuListComponent,
    CommonModule,
    MenusRoutingModule,
    MenusManageComponent
  ]
})
export class MenusModule { }
