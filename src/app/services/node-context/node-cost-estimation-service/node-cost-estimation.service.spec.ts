import { TestBed } from '@angular/core/testing';

import { NodeCostEstimationService } from './node-cost-estimation.service';

describe('NodeCostEstimationService', () => {
  let service: NodeCostEstimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeCostEstimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
