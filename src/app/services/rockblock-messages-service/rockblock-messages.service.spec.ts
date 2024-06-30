import { TestBed } from '@angular/core/testing';

import { RockBlockMessagesService } from './rock-block-messages.service';

describe('RockblockMessagesService', () => {
  let service: RockBlockMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RockBlockMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
