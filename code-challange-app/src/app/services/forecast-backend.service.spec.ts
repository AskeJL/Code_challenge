import { TestBed } from '@angular/core/testing';

import { ForecastBackendService } from './forecast-backend.service';

describe('ForecastBackendService', () => {
  let service: ForecastBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
