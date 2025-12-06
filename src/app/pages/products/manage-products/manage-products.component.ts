import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericManageComponent } from "src/app/components/generic-manage/generic-manage.component";
import { ProductService } from "src/app/services/product.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-products-manage',
  standalone: true,
  imports: [GenericManageComponent],
  templateUrl: './manage-products.component.html'
})
export class ProductsManageComponent implements OnInit {

  title = 'Create Product';
  singular = 'Product';

  mode: 'create' | 'update' | 'delete' = 'create';
  id!: number;

  product: any = null;

  fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text', required: false },
    { name: 'category', label: 'Category', type: 'text', required: false },
    { name: 'price', label: 'Price', type: 'currency', required: true }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductService
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
      this.title = 'Delete Product';
    } else {
      this.mode = 'update';
      this.title = 'Update Product';
    }

    // CARGAR PRODUCTO SI NO ES CREATE
    this.service.getById(this.id).subscribe({
      next: res => this.product = res,
      error: err => console.error('Error loading product', err)
    });
  }

  /** -------------------------  
   *  GUARDAR REGISTRO
   * ------------------------- */
  onSave(data: any): void {
    if (this.mode === 'create') {
      this.createProduct(data);
    } else if (this.mode === 'update') {
      this.updateProduct(data);
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
        this.router.navigate(['/products/list']);
      });
    });
  }

  /** -------------------------  
   *  MÉTODOS CRUD
   * ------------------------- */

  private createProduct(data: any) {
    this.service.create(data).subscribe(() => {
      Swal.fire('Created!', 'Product created successfully', 'success');
      this.router.navigate(['/products/list']);
    });
  }

  private updateProduct(data: any) {
    this.service.update(this.id, data).subscribe(() => {
      Swal.fire('Updated!', 'Product updated successfully', 'success');
      this.router.navigate(['/products/list']);
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
    this.router.navigate(['/products/list']);
  }
}
