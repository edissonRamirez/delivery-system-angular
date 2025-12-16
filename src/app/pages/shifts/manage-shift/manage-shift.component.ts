import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShiftService } from '../../../services/shift.service';
import { DriverService } from '../../../services/driver.service';
import { MotorcycleService } from '../../../services/motorcycle.service';
import { GenericManageComponent, ManageFieldConfig } from '../../../components/generic-manage/generic-manage.component';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-manage-shift',
    standalone: true,
    imports: [CommonModule, GenericManageComponent],
    templateUrl: './manage-shift.component.html'
})
export class ManageShiftComponent implements OnInit {

    title = 'Create Shift';
    singular = 'Shift';
    mode: 'create' | 'update' = 'create';
    id!: number;
    initialValue: any = null;

    fields: ManageFieldConfig[] = [
        { name: 'start_time', label: 'Start Time', type: 'datetime-local', required: true }, // Using generic input type for dates if supported or fall back to text
        { name: 'end_time', label: 'End Time', type: 'datetime-local', required: true },
        {
            name: 'driver_id',
            label: 'Driver',
            type: 'select',
            required: true,
            options: [],
            optionLabel: 'name',
            optionValue: 'id'
        },
        {
            name: 'motorcycle_id',
            label: 'Motorcycle',
            type: 'select',
            required: true,
            options: [],
            optionLabel: 'license_plate',
            optionValue: 'id'
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            required: true,
            options: [
                { label: 'Active', value: 'active' },
                { label: 'Completed', value: 'completed' },
                { label: 'Cancelled', value: 'cancelled' }
            ],
            optionLabel: 'label',
            optionValue: 'value'
        }
    ];

    constructor(
        private service: ShiftService,
        private driverService: DriverService,
        private motorcycleService: MotorcycleService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        // Load dependencies first
        forkJoin({
            drivers: this.driverService.getAll(),
            motorcycles: this.motorcycleService.getAll()
        }).subscribe(({ drivers, motorcycles }) => {
            // Update fields with loaded options
            this.updateFieldOptions('driver_id', drivers);
            this.updateFieldOptions('motorcycle_id', motorcycles);

            this.checkForUpdateMode();
        });
    }

    updateFieldOptions(fieldName: string, options: any[]) {
        const field = this.fields.find(f => f.name === fieldName);
        if (field) {
            field.options = options;
        }
    }

    checkForUpdateMode() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.mode = 'update';
            this.id = +id;
            this.title = 'Edit Shift';
            this.service.getById(this.id).subscribe(res => {
                // Transform datetimes if necessary to match input[type="datetime-local"] format (yyyy-MM-ddThh:mm)
                // Assuming res.start_time is coming in a compatible ISO format or needs adjustment.
                // If backend sends full ISO with timezone, might need slicing.
                // Simple approach: pass data directly for now.
                this.initialValue = res;
            });
        }
    }

    onSave(data: any) {
        if (this.mode === 'create') {
            this.service.create(data).subscribe(() => {
                Swal.fire('Created', 'Shift created successfully', 'success');
                this.router.navigate(['/shifts/list']);
            });
        } else {
            this.service.update(this.id, data).subscribe(() => {
                Swal.fire('Updated', 'Shift updated successfully', 'success');
                this.router.navigate(['/shifts/list']);
            });
        }
    }

    onCancel() {
        this.router.navigate(['/shifts/list']);
    }
}
