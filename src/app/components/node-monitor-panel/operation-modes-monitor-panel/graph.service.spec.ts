import { TestBed } from '@angular/core/testing';

import { GraphUIService } from './graph-ui.service';

describe('GraphService', () => {
  let service: GraphUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
