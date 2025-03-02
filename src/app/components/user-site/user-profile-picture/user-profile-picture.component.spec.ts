import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePictureComponent } from './user-profile-picture.component';

describe('UserProfileImageComponent', () => {
  let component: UserProfilePictureComponent;
  let fixture: ComponentFixture<UserProfilePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfilePictureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
