import { TestBed } from '@angular/core/testing';

import { CurdserviceService } from './curdservice.service';

describe('CurdserviceService', () => {
  let service: CurdserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurdserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
