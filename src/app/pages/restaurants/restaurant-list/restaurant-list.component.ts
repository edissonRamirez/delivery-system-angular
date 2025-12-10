import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../../services/restaurant.service';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './restaurant-list.component.html'
})
export class RestaurantListComponent implements OnInit {

  title = 'Restaurantes';
  singular = 'Restaurante';
  viewMode: 'table' | 'cards' = 'table';

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Nombre', field: 'name' },
    { header: 'Dirección', field: 'address' },
    { header: 'Teléfono', field: 'phone' },
    { header: 'Email', field: 'email' }
  ];

  data: any[] = [];

  constructor(private service: RestaurantService, private router: Router) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(res => {
      console.log("RECIBIDO DEL BACKEND:", res);
      console.log("ES ARRAY?", Array.isArray(res));
      this.data = res;
    });
  }

  onCreate() {
    this.router.navigate(['restaurants/create']);
  }

  onEdit(item: any) {
    this.router.navigate(['restaurants/update', item.id]);
  }

  onViewMenu(item: any) {
    this.router.navigate([`menus/view/${item.id}`]);
  }

  onDelete(item: any) {
    Swal.fire({
      title: '¿Seguro que deseas eliminar?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.service.delete(item.id).subscribe(() => {
          this.load();
        });
      }
    });
  }
}
