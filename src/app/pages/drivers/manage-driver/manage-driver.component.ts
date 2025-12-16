import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DriverService } from '../../../services/driver.service';
import { GenericManageComponent, ManageFieldConfig } from '../../../components/generic-manage/generic-manage.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-manage-driver',
    standalone: true,
    imports: [CommonModule, GenericManageComponent],
    templateUrl: './manage-driver.component.html'
})
export class ManageDriverComponent implements OnInit {

    title = 'Create Driver';
    singular = 'Driver';
    mode: 'create' | 'update' = 'create';
    id!: number;
    initialValue: any = null;

    fields: ManageFieldConfig[] = [
        { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Full Name' },
        { name: 'license_number', label: 'License Number', type: 'text', required: true, placeholder: 'License ID' },
        { name: 'phone', label: 'Phone', type: 'text', required: true, placeholder: 'Phone Number' },
        { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Email Address' },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            required: true,
            options: [
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' }
            ],
            optionLabel: 'label',
            optionValue: 'value'
        }
    ];

    constructor(
        private service: DriverService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.mode = 'update';
            this.id = +id;
            this.title = 'Edit Driver';
            this.service.getById(this.id).subscribe(res => {
                this.initialValue = res;
            });
        }
    }

    onSave(data: any) {
        if (this.mode === 'create') {
            this.service.create(data).subscribe(() => {
                Swal.fire('Created', 'Driver created successfully', 'success');
                this.router.navigate(['/drivers/list']);
            });
        } else {
            this.service.update(this.id, data).subscribe(() => {
                Swal.fire('Updated', 'Driver updated successfully', 'success');
                this.router.navigate(['/drivers/list']);
            });
        }
    }

    onCancel() {
        this.router.navigate(['/drivers/list']);
    }
}
