import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { SecurityService } from 'src/app/services/security.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [

    // ============================
    // Secciones del Sistema
    // ============================
    { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },

    // RESTAURANTES
    { path: '/restaurants/list', title: 'Restaurantes', icon: 'ni-shop text-orange', class: '' },

    // MENÚS
    { path: '/menus/list', title: 'Menús', icon: 'ni-bullet-list-67 text-red', class: '' },

    // PRODUCTOS
    { path: '/products/list', title: 'Productos', icon: 'ni-box-2 text-yellow', class: '' },

    // CLIENTES
    { path: '/customers/list', title: 'Clientes', icon: 'ni-circle-08 text-blue', class: '' },

    // ÓRDENES
    { path: '/orders/list', title: 'Órdenes', icon: 'ni-delivery-fast text-green', class: '' },

    // DIRECCIONES
    { path: '/addresses/list', title: 'Direcciones', icon: 'ni-pin-3 text-info', class: '' },

    // MOTOCICLETAS
    { path: '/motorcycles/list', title: 'Motos', icon: 'ni-send text-purple', class: '' },

    // INCIDENTES / ISSUES
    { path: '/issues/list', title: 'Incidentes', icon: 'ni-support-16 text-danger', class: '' },

    // FOTOS
    { path: '/photos/list', title: 'Fotos', icon: 'ni-image text-success', class: '' },

    // TURNOS
    { path: '/shifts/list', title: 'Turnos', icon: 'ni-time-alarm text-warning', class: '' },

    // CONDUCTORES
    { path: '/drivers/list', title: 'Conductores', icon: 'ni-single-02 text-primary', class: '' },

    // ============================
    // Auth / Demo original
    // ============================
    { path: '/login', title: 'Login', icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register', icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[] = [];
  public isCollapsed = true;

  user: User;
  subscription: Subscription;

  constructor(
    private router: Router,
    public securityService: SecurityService
  ) {
    this.subscription = this.securityService.getUser().subscribe(data => {
      this.user = data;
    });
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }
}
