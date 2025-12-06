import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericManageComponent } from "src/app/components/generic-manage/generic-manage.component";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: 'app-customers-manage',
  standalone: true,
  templateUrl: './customers-manage.component.html',
  imports: [GenericManageComponent]
})
export class CustomersManageComponent implements OnInit {

  title = 'Crear Cliente';
  customer: any = null;
  mode: 'create' | 'update' = 'create';
  id!: number;

  fields = [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Teléfono', type: 'text', required: true }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CustomerService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.mode = 'update';
      this.id = +id;
      this.title = 'Editar Cliente';

      this.service.getById(this.id).subscribe(res => {
        this.customer = res;
      });
    }
  }

  onSave(data: any) {
    if (this.mode === 'create') {
      this.service.create(data).subscribe(() => this.router.navigate(['/customers/list']));
    } else {
      this.service.update(this.id, data).subscribe(() => this.router.navigate(['/customers/list']));
    }
  }

  onCancel() {
    this.router.navigate(['/customers/list']);
  }
}
