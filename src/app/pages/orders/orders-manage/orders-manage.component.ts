import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericManageComponent } from "src/app/components/generic-manage/generic-manage.component";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: 'app-orders-manage',
  standalone: true,
  templateUrl: './orders-manage.component.html',
  imports: [GenericManageComponent]
})
export class OrdersManageComponent implements OnInit {

  title = 'Crear Orden';
  data : any = null;
  customers: any[] = [];
  menus: any[] = [];
  motorcycles: any[] = [];
  mode: 'create' | 'update' = 'create';
  id!: number;

  fields = [
    { name: 'product_name', label: 'Product Name', type: 'text', required: false },
    { name: 'customer_id', label: 'Customer ID', type: 'number', required: false },
    { name: 'menu_id', label: 'Menu ID', type: 'number', required: true },
    { name: 'motorcycle_id', label: 'Motorcycle ID', type: 'number', required: true },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true },
    { name: 'status', label: 'Status', type: 'text', required: true }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: OrderService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.mode = 'update';
      this.id = +id;
      this.title = 'Update Orders';

      this.service.getById(this.id).subscribe(res => {
        this.data = res;
      });
    }
  }

  onSave(data: any) {
    if (this.mode === 'create') {
      this.service.create(data).subscribe(() => this.router.navigate(['/orders/list']));
    } else {
      this.service.update(this.id, data).subscribe(() => this.router.navigate(['/orders/list']));
    }
  }

  onCancel() {
    this.router.navigate(['/orders/list']);
  }
}
