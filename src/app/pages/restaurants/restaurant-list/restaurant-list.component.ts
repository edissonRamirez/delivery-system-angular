import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../../../models/Restaurant';
import { RestaurantService } from '../../../services/restaurant.service';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './restaurant-list.component.html'
})
export class RestaurantListComponent implements OnInit {
  title = 'Restaurantes';
  singular = 'Restaurante';

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Address', field: 'address' },
    { header: 'Phone', field: 'phone' },
    { header: 'Email', field: 'email' }
  ];

  data: any[] = [];

  constructor(private service: RestaurantService, private router: Router) { }

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.data = res;
    });
  }

  onCreate() {
    this.router.navigate(['restaurants/create']);
  }

  onEdit(item: any) {
    this.router.navigate(['restaurants/update', item.id]);
  }

  onDelete(item: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d6d6d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(item.id).subscribe(() => {
          this.service.getAll().subscribe(res => {
            this.data = res;
          });
        });
      }
    });
  }

}
