import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryMonitorPanelComponent } from './battery-monitor-panel.component';

describe('BatteryStatusComponent', () => {
  let component: BatteryMonitorPanelComponent;
  let fixture: ComponentFixture<BatteryMonitorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatteryMonitorPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryMonitorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
