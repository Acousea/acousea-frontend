import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlushRequestQueuePopupComponent } from './flush-request-queue-popup.component';

describe('FlushRequestQueuePopupComponent', () => {
  let component: FlushRequestQueuePopupComponent;
  let fixture: ComponentFixture<FlushRequestQueuePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlushRequestQueuePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlushRequestQueuePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
