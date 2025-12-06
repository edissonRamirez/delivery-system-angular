import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { Photo } from 'src/app/models/Photo';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photos-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit {

  columns = [
    { header: 'Issue ID', field: 'issue_id' },
    { header: 'Image URL', field: 'image_url' },
    { header: 'Caption', field: 'caption' },
    { header: 'Taken at', field: 'taken_at' },
    { header: 'Cantidad', field: 'quantity' },
    { header: 'Total', field: 'total_price' },
    { header: 'Estado', field: 'status' },
  ];

  photos: Photo[] = [];

  constructor(
    private service: PhotoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(res => {
      this.photos = res;
    });
  }

  onCreate() {
    this.router.navigate(['/photos/create']);
  }

  onEdit(item: Photo) {
    this.router.navigate(['/photos/update', item.id]);
  }

  onDelete(item: Photo) {
    console.log("Eliminar Foto →", item);
    // Aquí puedes agregar SweetAlert2 si quieres
  }
}
