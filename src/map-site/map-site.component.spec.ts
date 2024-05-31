import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSiteComponent } from './map-site.component';

describe('MapSiteComponent', () => {
  let component: MapSiteComponent;
  let fixture: ComponentFixture<MapSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
