import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthenticationGuard } from 'src/app/guards/authentication.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {
        path: '',
        children: [
            {
                path: 'theaters',
                canActivate: [AuthenticationGuard],
                loadChildren: () => import('src/app/pages/theaters/theaters.module').then(m => m.TheatersModule)
            },
            {
                path: 'restaurants',
                canActivate: [AuthenticationGuard],
                loadChildren: () => import('src/app/pages/restaurants/restaurants.module').then(m => m.RestaurantsModule)
            },
            {
                path: 'products',
                canActivate: [AuthenticationGuard],
                loadChildren: () => import('src/app/pages/products/products.module').then(m => m.ProductsModule)
            },
            {
                path: 'menus',
                canActivate: [AuthenticationGuard],
                loadChildren: () => import('src/app/pages/menus/menus.module').then(m => m.MenusModule)
            },
            {
                path: 'customers',
                canActivate: [AuthenticationGuard],
                loadChildren: () => import('src/app/pages/customers/customers.module').then(m => m.CustomersModule)
            },
            {
                path: 'orders',
                canActivate: [AuthenticationGuard],
                loadChildren: () => import('src/app/pages/orders/orders.module').then(m => m.OrdersModule)
            },
            {
                path: 'addresses',
                canActivate: [AuthenticationGuard],
                loadChildren: () => import('src/app/pages/addresses/addresses.module').then(m => m.AddressesModule)
            },
            {
                path: 'motorcycles',
                canActivate: [AuthenticationGuard],
                loadChildren: () => import('src/app/pages/motorcycles/motorcycles.module').then(m => m.MotorcyclesModule)
            },
            {
                path: 'issues',
                canActivate: [AuthenticationGuard],
                loadChildren: () => import('src/app/pages/issues/issues.module').then(m => m.IssuesModule)
            },
            {
                path: 'photos',
                canActivate: [AuthenticationGuard],
                loadChildren: () => import('src/app/pages/photos/photos.module').then(m => m.PhotosModule)
            },

            // ⭐ NUEVA RUTA AÑADIDA AQUÍ ⭐
            {
                path: 'restauranttypes',
                canActivate: [AuthenticationGuard],
                loadChildren: () => import('src/app/pages/restaurant-types/restaurant-types.module')
                    .then(m => m.RestaurantTypesModule)
            }
        ]
    }
];
