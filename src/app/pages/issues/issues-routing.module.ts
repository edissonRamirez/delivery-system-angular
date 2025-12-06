import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { IssuesManageComponent } from './issues-manage/issues-manage.component';

const routes: Routes = [
  {
      path: "list",
      component: IssuesListComponent
    },
    {
      path: "create",
      component: IssuesManageComponent
    },
    {
      path: "update/:id",
      component: IssuesManageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuesRoutingModule { }
