import { TestBed } from '@angular/core/testing';

import { RockBlockMessageDetailsPopUpService } from './rock-block-message-details-pop-up.service';

describe('RockBlockMessageDetailsPopUpService', () => {
  let service: RockBlockMessageDetailsPopUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RockBlockMessageDetailsPopUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
