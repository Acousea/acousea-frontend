import { TestBed } from '@angular/core/testing';

import { NodeConfigurationService } from './node-configuration.service';

describe('CommunicationSystemServiceService', () => {
  let service: NodeConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
