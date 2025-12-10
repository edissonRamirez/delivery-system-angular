import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantTypesComponent } from './add-restaurant-types.component';

describe('AddRestaurantTypesComponent', () => {
  let component: AddRestaurantTypesComponent;
  let fixture: ComponentFixture<AddRestaurantTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRestaurantTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRestaurantTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
