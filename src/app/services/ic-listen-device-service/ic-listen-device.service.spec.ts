import { TestBed } from '@angular/core/testing';

import { CommunicationSystemInfoService } from './communication-system-info.service';

describe('DeviceInfoServiceService', () => {
  let service: CommunicationSystemInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunicationSystemInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
