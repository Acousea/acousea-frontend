import { TestBed } from '@angular/core/testing';

import { NodeDevicesService } from './node-devices.service';

describe('CommunicationSystemServiceService', () => {
  let service: NodeDevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeDevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
