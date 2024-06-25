import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOpModeSelectorComponent } from './map-op-mode-selector.component';

describe('MapOpModeSelectorComponent', () => {
  let component: MapOpModeSelectorComponent;
  let fixture: ComponentFixture<MapOpModeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapOpModeSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapOpModeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
