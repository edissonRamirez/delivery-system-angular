import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './list-products/list-products.component';
import { ProductsManageComponent } from './manage-products/manage-products.component';

const routes: Routes = [
  {
    path: "list",
    component: ProductListComponent
  },
  {
    path: "create",
    component: ProductsManageComponent
  },
  {
    path: "update/:id",
    component: ProductsManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
