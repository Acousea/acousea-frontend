import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileSiteComponent } from './user-profile-site.component';

describe('UserProfileSiteComponent', () => {
  let component: UserProfileSiteComponent;
  let fixture: ComponentFixture<UserProfileSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
