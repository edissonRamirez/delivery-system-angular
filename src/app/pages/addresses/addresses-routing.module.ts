import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressesManageComponent } from './addresses-manage/addresses-manage.component';
import { AddressesListComponent } from './addresses-list/addresses-list.component';

const routes: Routes = [
  {
      path: "list",
      component: AddressesListComponent
    },
    {
      path: "create",
      component: AddressesManageComponent
    },
    {
      path: "update/:id",
      component: AddressesManageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressesRoutingModule { }
