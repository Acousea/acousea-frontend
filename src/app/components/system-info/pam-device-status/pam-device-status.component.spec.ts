import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PamDeviceStatusComponent } from './pam-device-status.component';

describe('PamDeviceStatusComponent', () => {
  let component: PamDeviceStatusComponent;
  let fixture: ComponentFixture<PamDeviceStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PamDeviceStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PamDeviceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
