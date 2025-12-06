import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericManageComponent } from "src/app/components/generic-manage/generic-manage.component";
import { IssueService } from "src/app/services/issue.service";
import { MotorcycleService } from "src/app/services/motorcycle.service";

@Component({
  selector: 'app-issues-manage',
  standalone: true,
  templateUrl: './issues-manage.component.html',
  imports: [GenericManageComponent]
})
export class IssuesManageComponent implements OnInit {

  title = 'Create Issue';
  issues : any = null;
  mode: 'create' | 'update' = 'create';
  id!: number;
  fields = [
    { name: 'motorcycle_id', label: 'Motorcycle ID', type: 'number', required: false },
    { name: 'description', label: 'Description', type: 'text', required: false },
    { name: 'issue_type', label: 'Issue Type', type: 'text', required: true }, // accident, breakdown, maintenance
    { name: 'date_reported', label: 'Date Reported', type: 'date', required: true },
    { name: 'status', label: 'Status', type: 'text', required: true } // open, in_progress, resolved
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: IssueService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.mode = 'update';
      this.id = +id;
      this.title = 'Update Issues';

      this.service.getById(this.id).subscribe(res => {
        this.issues = res;
      });
    }
  }

  onSave(data: any) {
    if (this.mode === 'create') {
      this.service.create(data).subscribe(() => this.router.navigate(['/issues/list']));
    } else {
      this.service.update(this.id, data).subscribe(() => this.router.navigate(['/issues/list']));
    }
  }

  onCancel() {
    this.router.navigate(['/issues/list']);
  }
}
