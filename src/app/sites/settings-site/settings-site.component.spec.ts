import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSiteComponent } from './settings-site.component';

describe('SummarySiteComponent', () => {
  let component: SettingsSiteComponent;
  let fixture: ComponentFixture<SettingsSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
