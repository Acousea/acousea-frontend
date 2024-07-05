import { TestBed } from '@angular/core/testing';

import { UndoPopupService } from './undo-popup.service';

describe('UndoPopupService', () => {
  let service: UndoPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UndoPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
