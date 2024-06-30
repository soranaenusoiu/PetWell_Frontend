import { TestBed } from '@angular/core/testing';

import { VeterinariesService } from './veterinary.service';

describe('VeterinariesService', () => {
  let service: VeterinariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeterinariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
