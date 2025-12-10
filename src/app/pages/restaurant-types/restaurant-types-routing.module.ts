import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRestaurantTypesComponent } from './add-restaurant-types/add-restaurant-types.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddRestaurantTypesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantTypesRoutingModule { }
