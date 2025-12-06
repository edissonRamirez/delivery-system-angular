import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericManageComponent } from "src/app/components/generic-manage/generic-manage.component";
import { MotorcycleService } from "src/app/services/motorcycle.service";

@Component({
  selector: 'app-motorcycles-manage',
  standalone: true,
  templateUrl: './motorcycles-manage.component.html',
  imports: [GenericManageComponent]
})
export class MotorcyclesManageComponent implements OnInit {

  title = 'Create Motorcycle';
  motorcycles : any = null;
  mode: 'create' | 'update' = 'create';
  id!: number;
  fields = [
    { name: 'license_plate', label: 'License Plate', type: 'text', required: false },
    { name: 'brand', label: 'Brand', type: 'text', required: false },
    { name: 'model', label: 'Model', type: 'text', required: true },
    { name: 'year', label: 'Year', type: 'number', required: true },
    { name: 'status', label: 'Status', type: 'text', required: true }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MotorcycleService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.mode = 'update';
      this.id = +id;
      this.title = 'Update Motorcycles';

      this.service.getById(this.id).subscribe(res => {
        this.motorcycles = res;
      });
    }
  }

  onSave(data: any) {
    if (this.mode === 'create') {
      this.service.create(data).subscribe(() => this.router.navigate(['/motorcycles/list']));
    } else {
      this.service.update(this.id, data).subscribe(() => this.router.navigate(['/motorcycles/list']));
    }
  }

  onCancel() {
    this.router.navigate(['/motorcycles/list']);
  }
}
