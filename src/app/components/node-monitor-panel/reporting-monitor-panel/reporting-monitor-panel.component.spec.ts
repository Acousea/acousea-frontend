import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingMonitorPanelComponent } from './reporting-monitor-panel.component';

describe('ReportingMonitorPanelComponent', () => {
  let component: ReportingMonitorPanelComponent;
  let fixture: ComponentFixture<ReportingMonitorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportingMonitorPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportingMonitorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
