import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericManageComponent } from "src/app/components/generic-manage/generic-manage.component";
import { OrderService } from "src/app/services/order.service";
import { PhotoService } from "src/app/services/photo.service";

@Component({
  selector: 'app-photos-manage',
  standalone: true,
  templateUrl: './photos-manage.component.html',
  imports: [GenericManageComponent]
})
export class PhotosManageComponent implements OnInit {

  title = 'Create Photo';
  photos : any = null;
  mode: 'create' | 'update' = 'create';
  id!: number;

  fields = [
    { name: 'issue_id', label: 'Issue ID', type: 'text', required: false },
    { name: 'image_url', label: 'Image URL', type: 'string', required: false },
    { name: 'caption', label: 'Caption', type: 'text', required: true },
    { name: 'taken_at', label: 'Taken at', type: 'text', required: true }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PhotoService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.mode = 'update';
      this.id = +id;
      this.title = 'Update Photos';

      this.service.getById(this.id).subscribe(res => {
        this.photos = res;
      });
    }
  }

  onSave(data: any) {
    if (this.mode === 'create') {
      this.service.create(data).subscribe(() => this.router.navigate(['/photos/list']));
    } else {
      this.service.update(this.id, data).subscribe(() => this.router.navigate(['/photos/list']));
    }
  }

  onCancel() {
    this.router.navigate(['/photos/list']);
  }
}
