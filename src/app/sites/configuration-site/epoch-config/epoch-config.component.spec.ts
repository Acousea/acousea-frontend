import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpochConfigComponent } from './epoch-config.component';

describe('EpochConfigComponent', () => {
  let component: EpochConfigComponent;
  let fixture: ComponentFixture<EpochConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpochConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpochConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
