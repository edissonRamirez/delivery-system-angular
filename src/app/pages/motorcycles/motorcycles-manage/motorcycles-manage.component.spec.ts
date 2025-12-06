import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcyclesManageComponent } from './motorcycles-manage.component';

describe('MotorcyclesManageComponent', () => {
  let component: MotorcyclesManageComponent;
  let fixture: ComponentFixture<MotorcyclesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorcyclesManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorcyclesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
