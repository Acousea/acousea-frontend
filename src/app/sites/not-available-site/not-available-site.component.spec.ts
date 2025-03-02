import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAvailableSiteComponent } from './not-available-site.component';

describe('NotAvailableSiteComponent', () => {
  let component: NotAvailableSiteComponent;
  let fixture: ComponentFixture<NotAvailableSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAvailableSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotAvailableSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
