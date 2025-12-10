import { TestBed } from '@angular/core/testing';

import { RestauranttypeService } from './restauranttype.service';

describe('RestauranttypeService', () => {
  let service: RestauranttypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestauranttypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
