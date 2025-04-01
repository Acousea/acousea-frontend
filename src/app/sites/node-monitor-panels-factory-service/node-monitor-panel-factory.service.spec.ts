import { TestBed } from '@angular/core/testing';

import { NodeMonitorPanelFactoryService } from './node-monitor-panel-factory.service';

describe('NodeMonitorPanelFactoryService', () => {
  let service: NodeMonitorPanelFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeMonitorPanelFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
