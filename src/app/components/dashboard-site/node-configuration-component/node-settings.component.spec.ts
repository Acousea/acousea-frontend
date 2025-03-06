import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeSettingsComponent } from './node-settings.component';

describe('SettingsSiteComponent', () => {
  let component: NodeSettingsComponent;
  let fixture: ComponentFixture<NodeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
