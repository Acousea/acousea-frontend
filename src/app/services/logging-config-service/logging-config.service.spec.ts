import { TestBed } from '@angular/core/testing';

import { LoggingConfigService } from './logging-config.service';

describe('LoggingConfigService', () => {
  let service: LoggingConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
