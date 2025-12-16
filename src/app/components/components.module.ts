import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { GenericManageComponent } from './generic-manage/generic-manage.component';
import { MapPickerComponent } from './map-picker/map-picker.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    GenericTableComponent,
    MapPickerComponent,
    GenericManageComponent
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ChatbotComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ChatbotComponent
  ]
})
export class ComponentsModule { }
