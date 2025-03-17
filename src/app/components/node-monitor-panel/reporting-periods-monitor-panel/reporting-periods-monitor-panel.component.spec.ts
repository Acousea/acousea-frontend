import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingPeriodsMonitorPanel } from './reporting-periods-monitor-panel.component';

describe('ControlSystemConfigComponent', () => {
  let component: ReportingPeriodsMonitorPanel;
  let fixture: ComponentFixture<ReportingPeriodsMonitorPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportingPeriodsMonitorPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportingPeriodsMonitorPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
