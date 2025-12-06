import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericManageComponent } from "src/app/components/generic-manage/generic-manage.component";
import { AddressService } from "src/app/services/address.service";

@Component({
  selector: 'app-addresses-manage',
  standalone: true,
  templateUrl: './addresses-manage.component.html',
  imports: [GenericManageComponent]
})
export class AddressesManageComponent implements OnInit {

  title = 'Create Address';
  address: any = null;
  mode: 'create' | 'update' = 'create';
  id!: number;

  fields = [
    { name: 'id', label: 'ID', type: 'number', required: false },
    { name: 'order_id', label: 'Order ID', type: 'number', required: true },
    { name: 'street', label: 'Street', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'text', required: true },
    { name: 'postal_code', label: 'Postal Code', type: 'text', required: true },
    { name: 'additional_info', label: 'Additional Info', type: 'text', required: true },
    { name: 'order_id', label: 'Order ID', type: 'number', required: true },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AddressService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.mode = 'update';
      this.id = +id;
      this.title = 'Update Address';

      this.service.getById(this.id).subscribe(res => {
        this.address = res;
      });
    }
  }

  onSave(data: any) {
    if (this.mode === 'create') {
      this.service.create(data).subscribe(() => this.router.navigate(['/addresses/list']));
    } else {
      this.service.update(this.id, data).subscribe(() => this.router.navigate(['/addresses/list']));
    }
  }

  onCancel() {
    this.router.navigate(['/addresses/list']);
  }
}
