import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantsManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
      path:"list",
      component:RestaurantListComponent
    },
    {
      path:"create",
      component:RestaurantsManageComponent
    },
    {
      path:"update/:id",
      component:RestaurantsManageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
