import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { Photo } from 'src/app/models/Photo';
import { PhotoService } from 'src/app/services/photo.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photos-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit {

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Caption', field: 'caption' },
    { header: 'Taken At', field: 'taken_at', type: 'date' }, // Assuming date formatting is handled or generic table just shows string
    { header: 'Image', field: 'full_image_url', format: 'image' }, // Changed field to mapped property
    { header: 'Issue ID', field: 'issue_id' }
  ];

  photos: any[] = [];

  constructor(
    private service: PhotoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(res => {
      this.photos = res.map(p => ({
        ...p,
        full_image_url: p.image_url ? `${environment.url_web_socket}/${p.image_url}` : 'assets/img/theme/team-4-800x800.jpg' // Fallback or construct URL
      }));
    });
  }

  onCreate() {
    this.router.navigate(['/photos/create']);
  }

  onEdit(item: Photo) {
    this.router.navigate(['/photos/update', item.id]);
  }

  onDelete(item: Photo) {
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
        this.service.delete(item.id!).subscribe(() => {
          this.service.getAll().subscribe(res => {
            this.photos = res.map(p => ({
              ...p,
              full_image_url: p.image_url ? `${environment.url_web_socket}/${p.image_url}` : 'assets/img/theme/team-4-800x800.jpg'
            }));
          });
          Swal.fire('Deleted!', 'The photo has been deleted.', 'success');
        });
      }
    });
  }
}
