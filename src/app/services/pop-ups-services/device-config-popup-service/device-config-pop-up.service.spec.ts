import { TestBed } from '@angular/core/testing';

import { DeviceConfigPopUpService } from './device-config-pop-up.service';

describe('DeviceConfigPopUpService', () => {
  let service: DeviceConfigPopUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceConfigPopUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
