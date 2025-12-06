import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericManageComponent } from "src/app/components/generic-manage/generic-manage.component";
import { RestaurantService } from "src/app/services/restaurant.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-restaurants-manage',
  standalone: true,
  imports: [GenericManageComponent],
  templateUrl: './manage.component.html'
})
export class RestaurantsManageComponent implements OnInit {

  title = 'Create Restaurant';
  singular = 'Restaurant';

  mode: 'create' | 'update' | 'delete' = 'create';
  id!: number;

  data: any = null;

  fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'address', label: 'Address', type: 'text', required: false },
    { name: 'phone', label: 'Phone', type: 'text', required: false },
    { name: 'email', label: 'Email', type: 'text', required: true }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RestaurantService
  ) {}

  ngOnInit(): void {
    this.loadModeFromRoute();
  }

  /** -------------------------  
   *  CARGAR ESTADO DESDE LA URL
   * ------------------------- */
  private loadModeFromRoute(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const action = this.route.snapshot.queryParams['action'];

    // CREATE
    if (!id) return;

    // Tiene ID → es update o delete
    this.id = Number(id);

    if (action === 'delete') {
      this.mode = 'delete';
      this.title = 'Delete Restaurant';
    } else {
      this.mode = 'update';
      this.title = 'Update Restaurant';
    }

    // CARGAR RESTAURANT SI NO ES CREATE
    this.service.getById(this.id).subscribe({
      next: res => this.data = res,
      error: err => console.error('Error loading restaurant', err)
    });
  }

  /** -------------------------  
   *  GUARDAR REGISTRO
   * ------------------------- */
  onSave(data: any): void {
    if (this.mode === 'create') {
      this.createRestaurant(data);
    } else if (this.mode === 'update') {
      this.updateRestaurant(data);
    }
  }

  /** -------------------------  
   *  ELIMINAR REGISTRO
   * ------------------------- */
  onDelete(): void {
    this.showDeleteConfirm().then(result => {
      if (!result.isConfirmed) return;

      this.service.delete(this.id).subscribe(() => {
        Swal.fire('Deleted!', `${this.singular} removed successfully`, 'success');
        this.router.navigate(['/restaurants/list']);
      });
    });
  }

  /** -------------------------  
   *  MÉTODOS CRUD
   * ------------------------- */

  private createRestaurant(data: any) {
    this.service.create(data).subscribe(() => {
      Swal.fire('Created!', 'Restaurant created successfully', 'success');
      this.router.navigate(['/restaurants/list']);
    });
  }

  private updateRestaurant(data: any) {
    this.service.update(this.id, data).subscribe(() => {
      Swal.fire('Updated!', 'Restaurant updated successfully', 'success');
      this.router.navigate(['/restaurants/list']);
    });
  }

  /** -------------------------  
   *  CONFIRMACIÓN DE ELIMINAR
   * ------------------------- */
  private showDeleteConfirm() {
    return Swal.fire({
      title: `Delete ${this.singular}?`,
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it'
    });
  }

  /** -------------------------  
   *  CANCELAR
   * ------------------------- */
  onCancel(): void {
    this.router.navigate(['/restaurants/list']);
  }
}
