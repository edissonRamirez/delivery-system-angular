import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menus-view.component.html',
  styleUrls: ['./menus-view.component.scss']
})
export class ViewMenuComponent implements OnInit {

  restaurantId!: number;
  restaurantName: string = '';
  menuItems: any[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMenu();
  }

  loadMenu() {
    this.menuService.getAll().subscribe({
      next: res => {
        this.menuItems = res.filter((m: any) => m.restaurant_id === this.restaurantId);

        if (this.menuItems.length > 0) {
          this.restaurantName = this.menuItems[0].restaurant?.name ?? 'Menú';
        }

        this.loading = false;
      },
      error: err => {
        console.error('Error loading menu', err);
        this.loading = false;
      }
    });
  }

  onEdit(item: any) {
    this.router.navigate([`menus/update/${item.id}`]);
  }

  onDelete(item: any) {
      Swal.fire({
        title: '¿Seguro que deseas eliminar?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.menuService.delete(item.id).subscribe(() => {
            this.loadMenu();
          });
        }
      });
    }

  onBack() {
    this.router.navigate(['/restaurants/list']);
  }
}
