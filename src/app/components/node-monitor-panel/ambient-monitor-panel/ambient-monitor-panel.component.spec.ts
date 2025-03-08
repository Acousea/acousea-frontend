import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbientMonitorPanelComponent } from './ambient-monitor-panel.component';

describe('TemperatureAndHumidityComponent', () => {
  let component: AmbientMonitorPanelComponent;
  let fixture: ComponentFixture<AmbientMonitorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbientMonitorPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbientMonitorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
