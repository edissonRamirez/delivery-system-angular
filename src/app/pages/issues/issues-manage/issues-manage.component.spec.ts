import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesManageComponent } from './issues-manage.component';

describe('IssuesManageComponent', () => {
  let component: IssuesManageComponent;
  let fixture: ComponentFixture<IssuesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuesManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
