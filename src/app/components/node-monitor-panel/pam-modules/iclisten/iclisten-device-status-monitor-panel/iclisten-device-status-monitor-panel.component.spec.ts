import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ICListenDeviceStatusMonitorPanelComponent } from './iclisten-device-status-monitor-panel.component';
describe('PamDeviceStatusComponent', () => {
  let component: ICListenDeviceStatusMonitorPanelComponent;
  let fixture: ComponentFixture<ICListenDeviceStatusMonitorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ICListenDeviceStatusMonitorPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ICListenDeviceStatusMonitorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
