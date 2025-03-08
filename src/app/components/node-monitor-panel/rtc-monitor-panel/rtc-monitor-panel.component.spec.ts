import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTCMonitorPanelComponent } from './rtc-monitor-panel.component';

describe('RTCMonitorPanelComponent', () => {
  let component: RTCMonitorPanelComponent;
  let fixture: ComponentFixture<RTCMonitorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RTCMonitorPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RTCMonitorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
