import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RockblockMessageDetailsPopupComponent } from './rockblock-message-details-popup.component';

describe('RockblockMessageDetailsPopupComponent', () => {
  let component: RockblockMessageDetailsPopupComponent;
  let fixture: ComponentFixture<RockblockMessageDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RockblockMessageDetailsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RockblockMessageDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
