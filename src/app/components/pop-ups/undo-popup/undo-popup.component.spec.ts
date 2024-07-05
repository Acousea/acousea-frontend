import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoPopupComponent } from './undo-popup.component';

describe('UndoPopupComponent', () => {
  let component: UndoPopupComponent;
  let fixture: ComponentFixture<UndoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndoPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UndoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
