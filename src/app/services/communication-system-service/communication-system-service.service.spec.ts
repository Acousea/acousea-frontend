import { TestBed } from '@angular/core/testing';

import { CommunicationSystemService } from './communication-system.service';

describe('CommunicationSystemServiceService', () => {
  let service: CommunicationSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunicationSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
