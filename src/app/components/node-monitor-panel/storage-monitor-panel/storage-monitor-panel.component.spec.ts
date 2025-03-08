import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageMonitorPanelComponent } from './storage-monitor-panel.component';

describe('StorageStatusComponent', () => {
  let component: StorageMonitorPanelComponent;
  let fixture: ComponentFixture<StorageMonitorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageMonitorPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageMonitorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
