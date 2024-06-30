import { TestBed } from '@angular/core/testing';

import { AlertPopUpService } from './alert-pop-up.service';

describe('PopupsServiceService', () => {
  let service: AlertPopUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertPopUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
