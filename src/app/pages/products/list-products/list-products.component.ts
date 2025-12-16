import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './list-products.component.html'
})
export class ProductListComponent implements OnInit {
  title = 'Products';
  singular = 'Product';

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Product Name', field: 'name' },
    { header: 'Description', field: 'description' },
    { header: 'Category', field: 'category' },
    { header: 'Price', field: 'price', format: 'currency'}
  ];

  data: any[] = [];

  constructor(private service: ProductService, private router: Router) { }

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.data = res;
    });
  }

  onCreate() {
    this.router.navigate(['products/create']);
  }

  onEdit(item: any) {
    this.router.navigate(['products/update', item.id]);
  }

  onDelete(item: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d6d6d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(item.id).subscribe(() => {
          this.service.getAll().subscribe(res => {
            this.data = res;
          });
        });
      }
    });
  }

}
