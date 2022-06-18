import { TestBed } from '@angular/core/testing';

import { FunctionGuardService } from './function-guard.service';

describe('FunctionGuardService', () => {
  let service: FunctionGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
