import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMonitorPanelComponent } from './location-monitor-panel.component';

describe('CoordinatesComponent', () => {
  let component: LocationMonitorPanelComponent;
  let fixture: ComponentFixture<LocationMonitorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationMonitorPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationMonitorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
