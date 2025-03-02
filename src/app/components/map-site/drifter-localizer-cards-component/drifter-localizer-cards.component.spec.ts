import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrifterLocalizerCardsComponent } from './drifter-localizer-cards.component';

describe('MapOpModeSelectorComponent', () => {
  let component: DrifterLocalizerCardsComponent;
  let fixture: ComponentFixture<DrifterLocalizerCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrifterLocalizerCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrifterLocalizerCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
