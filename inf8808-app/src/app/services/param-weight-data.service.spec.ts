import { TestBed } from '@angular/core/testing';

import { ParamWeightDataService } from './param-weight-data.service';

describe('ParamWeightDataService', () => {
  let service: ParamWeightDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamWeightDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
