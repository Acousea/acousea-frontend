import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryStatsComponentComponent } from './summary-stats-component.component';

describe('SummaryStatsComponentComponent', () => {
  let component: SummaryStatsComponentComponent;
  let fixture: ComponentFixture<SummaryStatsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryStatsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryStatsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
