import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import { MenuListComponent } from './menus-list/menus-list.component';
import { MenusManageComponent } from './menus-manage/menus-manage.component';
import { ViewMenuComponent } from './menus-view/menus-view.component';


@NgModule({
  declarations: [],
  imports: [
    ViewMenuComponent,
    MenuListComponent,
    CommonModule,
    MenusRoutingModule,
    MenusManageComponent
  ]
})
export class MenusModule { }
