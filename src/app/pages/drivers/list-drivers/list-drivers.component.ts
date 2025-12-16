import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { DriverService } from '../../../services/driver.service';
import { Driver } from '../../../models/Driver';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-drivers',
    standalone: true,
    imports: [CommonModule, GenericTableComponent],
    templateUrl: './list-drivers.component.html',
    styleUrls: ['./list-drivers.component.scss']
})
export class ListDriversComponent implements OnInit {

    columns = [
        { header: 'ID', field: 'id' },
        { header: 'Name', field: 'name' },
        { header: 'License', field: 'license_number' },
        { header: 'Phone', field: 'phone' },
        { header: 'Email', field: 'email' },
        { header: 'Status', field: 'status' },
    ];

    data: Driver[] = [];

    constructor(
        private service: DriverService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.service.getAll().subscribe(res => {
            this.data = res;
        });
    }

    onCreate() {
        this.router.navigate(['/drivers/create']);
    }

    onEdit(item: Driver) {
        this.router.navigate(['/drivers/update', item.id]);
    }

    onDelete(item: Driver) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.service.delete(item.id).subscribe(() => {
                    this.service.getAll().subscribe(res => {
                        this.data = res;
                    });
                    Swal.fire(
                        'Deleted!',
                        'The driver has been deleted.',
                        'success'
                    );
                });
            }
        });
    }
}
