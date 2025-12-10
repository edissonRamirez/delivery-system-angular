import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersManageComponent } from './orders-manage/orders-manage.component';

const routes: Routes = [
  {
    path: "list",
    component: OrdersListComponent
  },
  {
    path: "create",
    component: OrdersManageComponent
  },
  {
    path: "update/:id",
    component: OrdersManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
