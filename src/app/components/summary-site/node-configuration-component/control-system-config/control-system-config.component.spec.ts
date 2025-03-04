import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSystemConfigComponent } from './control-system-config.component';

describe('ControlSystemConfigComponent', () => {
  let component: ControlSystemConfigComponent;
  let fixture: ComponentFixture<ControlSystemConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlSystemConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlSystemConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
