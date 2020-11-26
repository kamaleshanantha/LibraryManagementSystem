import { TestBed } from '@angular/core/testing';

import { LmsServiceService } from './lms-service.service';

describe('LmsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LmsServiceService = TestBed.get(LmsServiceService);
    expect(service).toBeTruthy();
  });
});
