import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotorcycleListComponent } from './motorcycles-list/motorcycles-list.component';
import { MotorcyclesManageComponent } from './motorcycles-manage/motorcycles-manage.component';

const routes: Routes = [
  {
    path: "list",
    component: MotorcycleListComponent
  },
  {
    path: "create",
    component: MotorcyclesManageComponent
  },
  {
    path: "update/:id",
    component: MotorcyclesManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotorcycleesRoutingModule { }
