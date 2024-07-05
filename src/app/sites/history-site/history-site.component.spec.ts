import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySiteComponent } from './history-site.component';

describe('HistorySiteComponent', () => {
  let component: HistorySiteComponent;
  let fixture: ComponentFixture<HistorySiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorySiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorySiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
