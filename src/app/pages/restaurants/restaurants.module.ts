import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantsManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RestaurantListComponent,
    RestaurantsManageComponent
  ]
})
export class RestaurantsModule { }
