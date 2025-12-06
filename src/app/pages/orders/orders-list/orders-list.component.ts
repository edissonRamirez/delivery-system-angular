import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/Order';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrderListComponent implements OnInit {

  columns = [
    { header: 'Product Name', field: 'product_name' },
    { header: 'ID Cliente', field: 'customer_id' },
    { header: 'Menú', field: 'menu_id' },
    { header: 'Motocicleta', field: 'motorcycle_id' },
    { header: 'Cantidad', field: 'quantity' },
    { header: 'Total', field: 'total_price' },
    { header: 'Estado', field: 'status' },
    
    
  ];

  orders: Order[] = [];

  constructor(
    private service: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(res => {
      this.orders = res;
    });
  }

  onCreate() {
    this.router.navigate(['/orders/create']);
  }

  onEdit(item: Order) {
    this.router.navigate(['/orders/update', item.id]);
  }

  onDelete(item: Order) {
    console.log("Eliminar Orden →", item);
    // Aquí puedes agregar SweetAlert2 si quieres
  }
}
