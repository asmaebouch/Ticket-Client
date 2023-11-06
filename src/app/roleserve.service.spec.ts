import { TestBed } from '@angular/core/testing';

import { RoleserveService } from './roleserve.service';

describe('RoleserveService', () => {
  let service: RoleserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
