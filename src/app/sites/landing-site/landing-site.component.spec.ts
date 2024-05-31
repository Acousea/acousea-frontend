import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSiteComponent } from './landing-site.component';

describe('LandingSiteComponent', () => {
  let component: LandingSiteComponent;
  let fixture: ComponentFixture<LandingSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
