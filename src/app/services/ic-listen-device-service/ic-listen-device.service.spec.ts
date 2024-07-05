import { TestBed } from '@angular/core/testing';

import { IcListenDeviceService } from './ic-listen-device.service';

describe('DeviceInfoServiceService', () => {
  let service: IcListenDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IcListenDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
