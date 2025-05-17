import { TestBed } from '@angular/core/testing';

import { RevealedService } from './revealed.service';

describe('RevealedService', () => {
  let service: RevealedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevealedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
