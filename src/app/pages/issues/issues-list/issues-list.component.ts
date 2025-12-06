import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { MotorcycleService } from '../../../services/motorcycle.service';
import { Motorcycle } from '../../../models/Motorcycle';
import { Issue } from 'src/app/models/Issue';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-issues-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  columns = [
    { header: 'Motorcycle ID', field: 'motorcycle_id' },
    { header: 'Description', field: 'description' },
    { header: 'Issue Type', field: 'issue_type' },
    { header: 'Date Reported', field: 'date_reported' },
    { header: 'Status', field: 'status' },
  ];

  issues: Issue[] = [];

  constructor(
    private service: IssueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(res => {
      this.issues = res;
    });
  }

  onCreate() {
    this.router.navigate(['/issues/create']);
  }

  onEdit(item: Issue) {
    this.router.navigate(['/issues/update', item.id]);
  }

  onDelete(item: Issue) {
    console.log("Delete Issue →", item);
    // Aquí puedes agregar SweetAlert2 si quieres
  }
}
