import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemInfoSiteComponent } from './system-info-site.component';

describe('DeviceInfoSiteComponent', () => {
  let component: SystemInfoSiteComponent;
  let fixture: ComponentFixture<SystemInfoSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemInfoSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemInfoSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
