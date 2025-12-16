import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

import { AuthenticationGuard } from 'src/app/guards/authentication.guard';
import { TrackingComponent } from 'src/app/pages/tracking/tracking.component';

export const AdminLayoutRoutes: Routes = [

    // ===============================
    // RUTAS PRINCIPALES
    // ===============================
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthenticationGuard] },
    { path: 'tables', component: TablesComponent, canActivate: [AuthenticationGuard] },
    { path: 'icons', component: IconsComponent, canActivate: [AuthenticationGuard] },
    { path: 'maps', component: MapsComponent, canActivate: [AuthenticationGuard] },

    // ===============================
    // RUTAS MÓDULOS SEPARADOS
    // ===============================
    {
        path: '',
        children: [

            // 🎭 THEATERS
            {
                path: 'theaters',
                canActivate: [AuthenticationGuard],
                loadChildren: () =>
                    import('src/app/pages/theaters/theaters.module')
                        .then(m => m.TheatersModule)
            },

            // 🍽 RESTAURANTS
            {
                path: 'restaurants',
                canActivate: [AuthenticationGuard],
                loadChildren: () =>
                    import('src/app/pages/restaurants/restaurants.module')
                        .then(m => m.RestaurantsModule)
            },

            // 📦 PRODUCTS
            {
                path: 'products',
                canActivate: [AuthenticationGuard],
                loadChildren: () =>
                    import('src/app/pages/products/products.module')
                        .then(m => m.ProductsModule)
            },
            {
                path: 'reports',
                loadComponent: () =>
                    import('src/app/pages/reports/reports-dashboard/reports-dashboard.component')
                        .then(m => m.ReportsDashboardComponent)
            },

            // 📋 MENUS
            {
                path: 'menus',
                canActivate: [AuthenticationGuard],
                loadChildren: () =>
                    import('src/app/pages/menus/menus.module')
                        .then(m => m.MenusModule)
            },

            // 👤 CUSTOMERS
            {
                path: 'customers',
                canActivate: [AuthenticationGuard],
                loadChildren: () =>
                    import('src/app/pages/customers/customers.module')
                        .then(m => m.CustomersModule)
            },

            // 🛵 MOTORCYCLES
            {
                path: 'motorcycles',
                canActivate: [AuthenticationGuard],
                loadChildren: () =>
                    import('src/app/pages/motorcycles/motorcycles.module')
                        .then(m => m.MotorcyclesModule)
            },

            // 🖼 PHOTOS
            {
                path: 'photos',
                canActivate: [AuthenticationGuard],
                loadChildren: () =>
                    import('src/app/pages/photos/photos.module')
                        .then(m => m.PhotosModule)
            },

            // 🛠 ISSUES
            {
                path: 'issues',
                canActivate: [AuthenticationGuard],
                loadChildren: () =>
                    import('src/app/pages/issues/issues.module')
                        .then(m => m.IssuesModule)
            },

            // 🗺 ADDRESSES
            {
                path: 'addresses',
                canActivate: [AuthenticationGuard],
                loadChildren: () =>
                    import('src/app/pages/addresses/addresses.module')
                        .then(m => m.AddressesModule)
            },
            {
                path: 'tracking',
                canActivate: [AuthenticationGuard],
                component: TrackingComponent
            },

            // 🍽 RESTAURANT TYPES ⭐ NUEVA
            {
                path: 'restauranttypes',
                canActivate: [AuthenticationGuard],
                loadChildren: () =>
                    import('src/app/pages/restaurant-types/restaurant-types.module')
                        .then(m => m.RestaurantTypesModule)
            },

            // ==============================================
            // 🧾 ORDERS — Standalone Components (sin módulo)
            // ==============================================
            {
                path: 'orders',
                canActivate: [AuthenticationGuard],
                children: [

                    {
                        path: 'list',
                        loadComponent: () =>
                            import('src/app/pages/orders/orders-list/orders-list.component')
                                .then(m => m.OrdersListComponent)
                    },

                    {
                        path: 'create',
                        loadComponent: () =>
                            import('src/app/pages/orders/orders-manage/orders-manage.component')
                                .then(m => m.OrdersManageComponent)
                    },

                    {
                        path: 'update/:id',
                        loadComponent: () =>
                            import('src/app/pages/orders/orders-manage/orders-manage.component')
                                .then(m => m.OrdersManageComponent)
                    },

                    {
                        path: 'view/:id',
                        loadComponent: () =>
                            import('src/app/pages/orders/orders-view/orders-view.component')
                                .then(m => m.OrdersViewComponent)
                    },
                    {
                        path: 'assign/:id',
                        loadComponent: () =>
                            import('src/app/pages/orders/orders-assign-moto/orders-assign-moto.component')
                                .then(m => m.OrdersAssignMotoComponent)
                    }

                ]
            }
        ]
    }
];
