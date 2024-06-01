import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInfoSiteComponent } from './device-info-site.component';

describe('DeviceInfoSiteComponent', () => {
  let component: DeviceInfoSiteComponent;
  let fixture: ComponentFixture<DeviceInfoSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceInfoSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceInfoSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
