import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowBubbleSubmenuComponent } from './window-bubble-submenu.component';

describe('WindowBubbleSubmenuComponent', () => {
  let component: WindowBubbleSubmenuComponent;
  let fixture: ComponentFixture<WindowBubbleSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowBubbleSubmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindowBubbleSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
