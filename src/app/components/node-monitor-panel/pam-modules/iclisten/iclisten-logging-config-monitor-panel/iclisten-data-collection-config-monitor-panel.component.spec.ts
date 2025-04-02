import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ICListenDataCollectionConfigMonitorPanel } from './iclisten-data-collection-config-monitor-panel.component';

describe('DataCollectionConfigComponent', () => {
  let component: ICListenDataCollectionConfigMonitorPanel;
  let fixture: ComponentFixture<ICListenDataCollectionConfigMonitorPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ICListenDataCollectionConfigMonitorPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ICListenDataCollectionConfigMonitorPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
