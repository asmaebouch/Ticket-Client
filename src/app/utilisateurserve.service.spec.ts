import { TestBed } from '@angular/core/testing';

import { UtilisateurserveService } from './utilisateurserve.service';

describe('UtilisateurserveService', () => {
  let service: UtilisateurserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisateurserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
