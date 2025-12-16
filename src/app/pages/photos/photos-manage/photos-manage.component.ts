import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericManageComponent, ManageFieldConfig } from "src/app/components/generic-manage/generic-manage.component";
import { PhotoService } from "src/app/services/photo.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-photos-manage',
  standalone: true,
  templateUrl: './photos-manage.component.html',
  imports: [GenericManageComponent]
})
export class PhotosManageComponent implements OnInit {

  title = 'Create Photo';
  singular = 'Photo';
  photos: any = null;
  mode: 'create' | 'update' = 'create';
  id!: number;
  initialValue: any = null;

  fields: ManageFieldConfig[] = [
    { name: 'caption', label: 'Caption', type: 'text', required: false, placeholder: 'Enter caption' },
    { name: 'taken_at', label: 'Taken At', type: 'datetime-local', required: false },
    { name: 'file', label: 'Upload Image', type: 'file', required: false }, // Field name 'file' for backend requirements
    // If backend requires 'image_url' string in create, we might have issues, but usually upload is separate.
    // However, if update mode, maybe we show text input for URL or just file upload to replace?
    // Let's keep file upload.
    { name: 'issue_id', label: 'Issue ID', type: 'number', required: false, placeholder: 'Related Issue ID' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PhotoService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.mode = 'update';
      this.id = +id;
      this.title = 'Update Photo';

      this.service.getById(this.id).subscribe(res => {
        this.initialValue = res;
        // If updating, maybe we don't require file re-upload?
        // GenericManage doesn't show file preview, so user just sees empty file input.
      });
    }
  }

  onSave(data: any) {
    if (this.mode === 'create') {
      this.service.create(data).subscribe(() => {
        Swal.fire('Created', 'Photo created successfully', 'success');
        this.router.navigate(['/photos/list']);
      });
    } else {
      this.service.update(this.id, data).subscribe(() => {
        Swal.fire('Updated', 'Photo updated successfully', 'success');
        this.router.navigate(['/photos/list']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/photos/list']);
  }
}
