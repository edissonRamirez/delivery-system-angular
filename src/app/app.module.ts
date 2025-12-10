import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { WebSocketService } from './services/web-socket-service.service';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { MotorcycleListComponent } from './pages/motorcycles/motorcycles-list/motorcycles-list.component';
import { MotorcyclesManageComponent } from './pages/motorcycles/motorcycles-manage/motorcycles-manage.component';
import { AddRestaurantTypesComponent } from 'src/app/pages/restaurant-types/add-restaurant-types/add-restaurant-types.component'



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    TrackingComponent
  ],
  providers: [
    WebSocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true   // 👈 importante: permite múltiples interceptores
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
