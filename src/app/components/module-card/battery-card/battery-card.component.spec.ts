import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryCardComponent } from './battery-card.component';

describe('BatteryStatusComponent', () => {
  let component: BatteryCardComponent;
  let fixture: ComponentFixture<BatteryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatteryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
