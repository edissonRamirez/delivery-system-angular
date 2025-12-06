import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { PhotosManageComponent } from './photos-manage/photos-manage.component';

const routes: Routes = [
  {
      path: "list",
      component: PhotosListComponent
    },
    {
      path: "create",
      component: PhotosManageComponent
    },
    {
      path: "update/:id",
      component: PhotosManageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule { }
