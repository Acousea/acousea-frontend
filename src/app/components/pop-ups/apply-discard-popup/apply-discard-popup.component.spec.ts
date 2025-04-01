import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyDiscardPopupComponent } from './apply-discard-popup.component';

describe('ApplyDiscardPopupComponent', () => {
  let component: ApplyDiscardPopupComponent;
  let fixture: ComponentFixture<ApplyDiscardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyDiscardPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyDiscardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
