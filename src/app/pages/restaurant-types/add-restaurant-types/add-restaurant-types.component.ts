import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestauranttypeService } from 'src/app/services/restauranttype.service';

@Component({
  selector: 'app-add-restaurant-types',
  templateUrl: './add-restaurant-types.component.html',
  styleUrls: ['./add-restaurant-types.component.scss']
})
export class AddRestaurantTypesComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private restauranttypeService: RestauranttypeService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      restaurant_id: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/)   // Solo números
        ]
      ],
      region_id: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ]
      ]
    });
  }

  /**
   * Envía la relación región–restaurante al backend
   */
  AddRegionToRestaurant() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    alert('Debe completar todos los campos correctamente.');
    return;
  }

  const restaurant_id = Number(this.form.value.restaurant_id);
  const region_id = Number(this.form.value.region_id);

  this.restauranttypeService.AddRegionToRestaurant(restaurant_id, region_id)
    .subscribe({
      next: () => {
        alert('Región asignada correctamente al restaurante.');
        this.form.reset();
      },
      error: (err) => {
        console.error('Error creando relación:', err);
        alert('Ocurrió un error al asignar la región.');
      }
    });
}


  // Getters para facilitar validaciones en HTML
  get restaurant_id() { return this.form.get('restaurant_id'); }
  get region_id() { return this.form.get('region_id'); }

}
