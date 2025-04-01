import { TestBed } from '@angular/core/testing';

import { NodeContextService } from './node-context.service';

describe('NodeContextService', () => {
  let service: NodeContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
