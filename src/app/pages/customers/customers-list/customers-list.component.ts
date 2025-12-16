import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/Customer';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './customers-list.component.html'
})
export class CustomersListComponent implements OnInit {

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Email', field: 'email' },
    { header: 'Phone', field: 'phone' }
  ];

  customers: Customer[] = [];

  constructor(
    private service: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(res => {
      this.customers = res;
    });
  }

  onCreate() {
    this.router.navigate(['/customers/create']);
  }

  onEdit(item: Customer) {
    this.router.navigate(['/customers/update', item.id]);
  }

  onDelete(item: Customer) {
    console.log("Eliminar cliente", item);
  }

  // ⭐⭐⭐ NUEVO: Navegar a vista de órdenes del cliente
  onViewOrders(item: Customer) {
    this.router.navigate(['/orders/view', item.id]);
  }

}
