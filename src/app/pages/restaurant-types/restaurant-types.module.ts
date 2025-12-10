import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RestaurantTypesRoutingModule } from './restaurant-types-routing.module';
import { AddRestaurantTypesComponent } from './add-restaurant-types/add-restaurant-types.component';

@NgModule({
  declarations: [
    AddRestaurantTypesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // ⭐ OBLIGATORIO PARA formGroup y formControlName ⭐
    RestaurantTypesRoutingModule
  ]
})
export class RestaurantTypesModule { }
