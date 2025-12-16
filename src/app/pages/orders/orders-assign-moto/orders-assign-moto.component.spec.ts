import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAssignMotoComponent } from './orders-assign-moto.component';

describe('OrdersAssignMotoComponent', () => {
  let component: OrdersAssignMotoComponent;
  let fixture: ComponentFixture<OrdersAssignMotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersAssignMotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersAssignMotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
