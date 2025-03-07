import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInfoButtonComponent } from './update-info-button.component';

describe('UpdateInfoButtonComponent', () => {
  let component: UpdateInfoButtonComponent;
  let fixture: ComponentFixture<UpdateInfoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInfoButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateInfoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
