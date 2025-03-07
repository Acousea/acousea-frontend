import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationModesCardComponent } from './operation-modes-card.component';

describe('OperationModesCardComponent', () => {
  let component: OperationModesCardComponent;
  let fixture: ComponentFixture<OperationModesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationModesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationModesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
