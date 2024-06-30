import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceConfigPopupComponent } from './device-config-popup.component';

describe('DeviceConfigPopupComponent', () => {
  let component: DeviceConfigPopupComponent;
  let fixture: ComponentFixture<DeviceConfigPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceConfigPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceConfigPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
