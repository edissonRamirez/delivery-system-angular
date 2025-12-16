import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { ShiftService } from '../../../services/shift.service';
import { Shift } from '../../../models/Shift';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-shifts',
    standalone: true,
    imports: [CommonModule, GenericTableComponent],
    templateUrl: './list-shifts.component.html',
    styleUrls: ['./list-shifts.component.scss']
})
export class ListShiftsComponent implements OnInit {

    columns = [
        { header: 'ID', field: 'id' },
        { header: 'Driver', field: 'driver_name' },
        { header: 'Start Time', field: 'start_time' },
        { header: 'End Time', field: 'end_time' },
        { header: 'Status', field: 'status' },
        { header: 'Motorcycle', field: 'motorcycle_plate' }
    ];

    data: Shift[] = [];

    constructor(
        private service: ShiftService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.service.getAll().subscribe(res => {
            this.data = res;
            // Optional: Process data to flatten if GenericTable doesn't support nested keys "driver.name"
            // Assuming GenericTable handles or we flatten here.
            // Usually generic tables in angular might need help with nested properties.
            // Let's assume for now it might need flattening or the backend returns flattened data.
            // If backend returns 'driver': { 'name': ... }, GenericTable needs to handle 'driver.name'.
        });
    }

    onCreate() {
        this.router.navigate(['/shifts/create']);
    }

    onEdit(item: Shift) {
        this.router.navigate(['/shifts/update', item.id]);
    }

    onDelete(item: Shift) {
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
                        'The shift has been deleted.',
                        'success'
                    );
                });
            }
        });
    }
}
