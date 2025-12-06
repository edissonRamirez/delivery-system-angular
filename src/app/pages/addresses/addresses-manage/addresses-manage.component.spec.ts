import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesManageComponent } from './addresses-manage.component';

describe('AddressesManageComponent', () => {
  let component: AddressesManageComponent;
  let fixture: ComponentFixture<AddressesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressesManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
