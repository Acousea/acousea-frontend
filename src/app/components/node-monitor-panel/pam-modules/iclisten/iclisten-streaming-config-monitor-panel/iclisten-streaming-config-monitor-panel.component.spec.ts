import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ICListenStreamingConfigMonitorPanelComponent } from './iclisten-streaming-config-monitor-panel.component';

describe('ICListenStreamingConfigMonitorPanelComponent', () => {
  let component: ICListenStreamingConfigMonitorPanelComponent;
  let fixture: ComponentFixture<ICListenStreamingConfigMonitorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ICListenStreamingConfigMonitorPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ICListenStreamingConfigMonitorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
