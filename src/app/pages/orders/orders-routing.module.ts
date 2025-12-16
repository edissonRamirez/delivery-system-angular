import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersManageComponent } from './orders-manage/orders-manage.component';
import { OrdersViewComponent } from './orders-view/orders-view.component';

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
  },
  {
    path: "view/:id",
    component: OrdersViewComponent
  },
  {
    path: "assign/:id",
    loadComponent: () =>
      import('./orders-assign-moto/orders-assign-moto.component')
        .then(m => m.OrdersAssignMotoComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
