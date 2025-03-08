import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryStatsSectionComponent } from './summary-stats-section.component';

describe('SummaryStatsComponentComponent', () => {
  let component: SummaryStatsSectionComponent;
  let fixture: ComponentFixture<SummaryStatsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryStatsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryStatsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
