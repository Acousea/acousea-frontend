import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWindowBubbleComponent } from './user-window-bubble.component';

describe('UserWindowBubbleComponent', () => {
  let component: UserWindowBubbleComponent;
  let fixture: ComponentFixture<UserWindowBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWindowBubbleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserWindowBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
