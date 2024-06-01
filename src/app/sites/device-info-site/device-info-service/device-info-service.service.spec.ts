import { TestBed } from '@angular/core/testing';

import { DeviceInfoServiceService } from './device-info-service.service';

describe('DeviceInfoServiceService', () => {
  let service: DeviceInfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceInfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
