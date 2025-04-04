import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeStatsSectionComponent } from './node-stats-section.component';

describe('SummaryStatsComponentComponent', () => {
  let component: NodeStatsSectionComponent;
  let fixture: ComponentFixture<NodeStatsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeStatsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeStatsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
