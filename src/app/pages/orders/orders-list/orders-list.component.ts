import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit {

  viewMode: 'table' | 'cards' = 'table';

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Cliente', field: 'customer_name' },
    { header: 'Restaurante', field: 'restaurant_name' },
    { header: 'Producto', field: 'product_name' },
    { header: 'Precio Total', field: 'total_price' },
    { header: 'Estado', field: 'status' }
  ];

  orders: any[] = [];

  constructor(
    private service: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.orders = res.map(o => ({
        ...o,
        // construir lista de productos para la vista de cards
        products: [
          {
            name: o.product_name,
            price: o.product_price
          }
        ]
      }));
    });
  }

  onCreate() {
    this.router.navigate(['orders/create']);
  }

  onEdit(item: any) {
    this.router.navigate(['orders/update', item.id]);
  }

  onDelete(item: any) {
    Swal.fire({
      title: '¿Eliminar orden?',
      text: 'No podrás deshacer esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d6d6d6',
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.service.delete(item.id).subscribe(() => {
          this.service.getAll().subscribe(res => {
            this.orders = res;
          });
        });
      }
    });
  }

}
