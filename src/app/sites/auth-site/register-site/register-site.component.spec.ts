import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSiteComponent } from './register-site.component';

describe('RegisterSiteComponent', () => {
  let component: RegisterSiteComponent;
  let fixture: ComponentFixture<RegisterSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
