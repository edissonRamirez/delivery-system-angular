import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersManageComponent } from './customers-manage/customers-manage.component';

const routes: Routes = [
  {
    path: "list",
    component: CustomersListComponent
  },
  {
    path: "create",
    component: CustomersManageComponent
  },
  {
    path: "update/:id",
    component: CustomersManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
