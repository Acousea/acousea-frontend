import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSiteComponent } from './auth-site.component';

describe('AuthSiteComponent', () => {
  let component: AuthSiteComponent;
  let fixture: ComponentFixture<AuthSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
