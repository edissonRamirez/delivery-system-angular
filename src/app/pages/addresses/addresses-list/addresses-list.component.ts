import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/Customer';
import { Address } from 'src/app/models/Address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-addresses-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './addresses-list.component.html'
})
export class AddressesListComponent implements OnInit {

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Order', field: 'order_id' },
    { header: 'Street', field: 'street' },
    { header: 'City', field: 'city' },
    { header: 'State', field: 'state' },
    { header: 'Zip Code', field: 'postal_code' },
    { header: 'Aditional Info', field: 'additional_info' },
  ];

  addresses: Address[] = [];

  constructor(
    private service: AddressService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(res => {
      this.addresses = res;
    });
  }

  onCreate() {
    this.router.navigate(['/addresses/create']);
  }

  onEdit(item: Address) {
    this.router.navigate(['/addresses/update', item.id]);
  }

  onDelete(item: Address) {
    console.log("Eliminar dirección", item);
    // Opcional: SweetAlert2
  }
}
