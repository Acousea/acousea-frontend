import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStepAccountComponent } from './register-step-account.component';

describe('RegisterStep1Component', () => {
  let component: RegisterStepAccountComponent;
  let fixture: ComponentFixture<RegisterStepAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterStepAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStepAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
