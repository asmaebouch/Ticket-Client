import { TestBed } from '@angular/core/testing';

import { PLateformeService } from './plateforme.service';

describe('PLateformeService', () => {
  let service: PLateformeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PLateformeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
