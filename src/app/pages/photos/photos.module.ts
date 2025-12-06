import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { PhotosManageComponent } from './photos-manage/photos-manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
        PhotosRoutingModule,
        PhotosListComponent,
        PhotosManageComponent,
        FormsModule,
        ReactiveFormsModule,
  ]
})
export class PhotosModule { }
