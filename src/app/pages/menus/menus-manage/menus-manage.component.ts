import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericManageComponent } from "../../../components/generic-manage/generic-manage.component";
import { MenuService } from "src/app/services/menu.service";
import { RestaurantService } from "src/app/services/restaurant.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-menus-manage',
  standalone: true,
  templateUrl: './menus-manage.component.html',
  imports: [GenericManageComponent]
})
export class MenusManageComponent implements OnInit {

  title = 'Crear Menú';
  menu: any = null;
  restaurants: any[] = [];
  products: any[] = [];
  mode: 'create' | 'update' = 'create';
  id!: number;

  fields = [
    {
      name: 'restaurant_id', label: 'Restaurante', type: 'select', required: true,
      optionLabel: 'name',    // qué propiedad mostrar
      optionValue: 'id',      // qué enviar al backend
      options: [] as any[]
    },
    { name: 'product_id', label: 'Producto', type: 'select', required: true,
      optionLabel: 'name',
      optionValue: 'id',
      options: [] as any[]
    },
    { name: 'price', label: 'Precio', type: 'currency', required: true },
    { name: 'availability', label: 'Disponibilidad', type: 'select', required: true,
    options: [
      { label: 'Disponible', value: true },
      { label: 'Agotado', value: false }
    ],
    optionLabel: 'label',
    optionValue: 'value'
  }
  ];

  constructor(
    private restaurantService: RestaurantService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private service: MenuService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // cargar restaurantes
    this.restaurantService.getAll().subscribe(res => {
      this.restaurants = res;

      // asignar las opciones al campo select
      this.fields.find(f => f.name === 'restaurant_id')!.options = this.restaurants;
    });

    // cargar productos
    this.productService.getAll().subscribe(res => {
      this.products = res;

      // asignar las opciones al campo select
      this.fields.find(f => f.name === 'product_id')!.options = this.products;
    });
    if (id) {
      this.mode = 'update';
      this.id = +id;
      this.title = 'Actualizar Menú';

      this.service.getById(this.id).subscribe(res => {
        this.menu = res;
      });
    }
  }

  onSave(data: any) {
    // Convertir availability string → boolean
    if (data.availability === "true") data.availability = true;
    if (data.availability === "false") data.availability = false;

    if (this.mode === 'create') {
      this.service.create(data).subscribe(() => this.router.navigate(['/menus/list']));
    } else {
      this.service.update(this.id, data).subscribe(() => this.router.navigate(['/menus/list']));
    }
  }

  onCancel() {
    this.router.navigate(['/menus/list']);
  }
}
