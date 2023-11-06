import { TestBed } from '@angular/core/testing';

import { ChanagerMdpService } from './chanager-mdp.service';

describe('ChanagerMdpService', () => {
  let service: ChanagerMdpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChanagerMdpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
