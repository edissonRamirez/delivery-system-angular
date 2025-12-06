import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { Router } from '@angular/router';
import { MenuService   } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './menus-list.component.html'
})
export class MenuListComponent implements OnInit {
  title = 'Menus';
  singular = 'Menu';

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Restaurante', field: 'restaurant_name' },
    { header: 'Producto', field: 'product_name' },
    { header: 'Precio', field: 'price', format: 'currency' },
    { header: 'Disponibilidad', field: 'availability' }
  ];

  data: any[] = [];

  constructor(private service: MenuService, private router: Router) { }

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.data = res;
    });
  }

  onCreate() {
    this.router.navigate(['menus/create']);
  }

  onEdit(item: any) {
    this.router.navigate(['menus/update', item.id]);
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
