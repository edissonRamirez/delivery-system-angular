import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { MotorcycleService } from 'src/app/services/motorcycle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders-assign-moto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders-assign-moto.component.html',
  styleUrls: ['./orders-assign-moto.component.scss']
})
export class OrdersAssignMotoComponent implements OnInit {

  orderId!: number;
  order: any = {};
  motorcycles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private motoService: MotorcycleService
  ) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrder();
    this.loadMotorcycles();
  }

  loadOrder() {
    this.orderService.getById(this.orderId).subscribe(res => {
      this.order = res;
    });
  }

  loadMotorcycles() {
    this.motoService.getAll().subscribe(res => {
      this.motorcycles = res;
    });
  }

  save() {
    if (!this.order.motorcycle_id) {
      Swal.fire('Error', 'Debe seleccionar una moto', 'error');
      return;
    }

    const updatedOrder = {
      ...this.order,
      motorcycle_id: this.order.motorcycle_id,
      status: 'asignado'
    };

    this.orderService.update(this.orderId, updatedOrder).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Moto asignada correctamente',
        timer: 1500,
        showConfirmButton: false
      });

      this.router.navigate(['/orders/list']);
    });
  }

  cancel() {
    this.router.navigate(['/orders/list']);
  }

}
