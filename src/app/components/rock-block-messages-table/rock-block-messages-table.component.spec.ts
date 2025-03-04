import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RockBlockMessagesTableComponent } from './rock-block-messages-table.component';

describe('RockBlockMessagesTableComponent', () => {
  let component: RockBlockMessagesTableComponent;
  let fixture: ComponentFixture<RockBlockMessagesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RockBlockMessagesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RockBlockMessagesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
