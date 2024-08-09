import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreTemperatureAndOperationModeComponent } from './core-temperature-and-operation-mode.component';

describe('CoreTemperatureAndOperationModeComponent', () => {
  let component: CoreTemperatureAndOperationModeComponent;
  let fixture: ComponentFixture<CoreTemperatureAndOperationModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreTemperatureAndOperationModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoreTemperatureAndOperationModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
