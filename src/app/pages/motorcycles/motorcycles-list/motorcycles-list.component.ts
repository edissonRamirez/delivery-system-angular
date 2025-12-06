import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { MotorcycleService } from '../../../services/motorcycle.service';
import { Motorcycle } from '../../../models/Motorcycle';

@Component({
  selector: 'app-motorcycle-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './motorcycles-list.component.html',
  styleUrls: ['./motorcycles-list.component.scss']
})
export class MotorcycleListComponent implements OnInit {

  columns = [
    { header: 'License Plate', field: 'license_plate' },
    { header: 'Brand', field: 'brand' },
    { header: 'Year', field: 'year' },
    { header: 'Status', field: 'status' },
  ];

  motorcycles: Motorcycle[] = [];

  constructor(
    private service: MotorcycleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(res => {
      this.motorcycles = res;
    });
  }

  onCreate() {
    this.router.navigate(['/motorcycles/create']);
  }

  onEdit(item: Motorcycle) {
    this.router.navigate(['/motorcycles/update', item.id]);
  }

  onDelete(item: Motorcycle) {
    console.log("Eliminar Orden →", item);
    // Aquí puedes agregar SweetAlert2 si quieres
  }
}
