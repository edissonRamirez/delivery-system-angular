import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenusManageComponent } from '../menus/menus-manage/menus-manage.component';
import { MenuListComponent } from './menus-list/menus-list.component';

const routes: Routes = [
  {
          path:"list",
          component:MenuListComponent
        },
        {
          path:"create",
          component:MenusManageComponent
        },
        {
          path:"update/:id",
          component:MenusManageComponent
        }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }
