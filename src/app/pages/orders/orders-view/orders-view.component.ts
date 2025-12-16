import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';
import { LOCALE_ID } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

// Registrar localización para COP
registerLocaleData(localeEsCO, 'es-CO');

@Component({
  selector: 'app-orders-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss'],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ]
})
export class OrdersViewComponent implements OnInit {

  customerId!: number;
  customerName: string = '';

  orders: any[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAll().subscribe({
      next: (res) => {
        console.log("ORDERS FROM BACKEND:", res);

        // Filtrar solo las órdenes del cliente seleccionado
        this.orders = res.filter((o: any) => o.customer_id === this.customerId);

        console.log("ORDERS OF CUSTOMER:", this.orders);

        // Tomar el nombre del cliente si existe
        if (this.orders.length > 0) {
          this.customerName = this.orders[0].customer?.name ?? 'Cliente';
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading orders', err);
        this.loading = false;
      }
    });
  }

  onBack() {
    this.router.navigate(['/customers/list']);
  }
}
