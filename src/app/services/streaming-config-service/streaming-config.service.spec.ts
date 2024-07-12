import { TestBed } from '@angular/core/testing';

import { StreamingConfigService } from './streaming-config.service';

describe('StreamingConfigService', () => {
  let service: StreamingConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamingConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
