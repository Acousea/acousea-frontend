import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeSettingsSectionComponent } from './node-settings-section.component';

describe('SettingsSiteComponent', () => {
  let component: NodeSettingsSectionComponent;
  let fixture: ComponentFixture<NodeSettingsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeSettingsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeSettingsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
