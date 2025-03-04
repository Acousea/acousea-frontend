import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStepProfileComponent } from './register-step-profile.component';

describe('RegisterStep2PersonalComponent', () => {
  let component: RegisterStepProfileComponent;
  let fixture: ComponentFixture<RegisterStepProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterStepProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStepProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
