import { TestBed } from '@angular/core/testing';

import { FlushRequestQueuePopupService } from './flush-request-queue-popup.service';

describe('FlushRequestQueuePopupService', () => {
  let service: FlushRequestQueuePopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlushRequestQueuePopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
