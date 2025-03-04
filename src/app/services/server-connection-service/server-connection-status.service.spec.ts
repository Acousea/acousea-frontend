import { TestBed } from '@angular/core/testing';

import { ServerConnectionStatusService } from './server-connection-status.service';

describe('BackendStatusService', () => {
  let service: ServerConnectionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerConnectionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
