import { TestBed } from '@angular/core/testing';

import { MessageDetailsPopUpService } from './message-details-pop-up.service';

describe('RockBlockMessageDetailsPopUpService', () => {
  let service: MessageDetailsPopUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageDetailsPopUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
