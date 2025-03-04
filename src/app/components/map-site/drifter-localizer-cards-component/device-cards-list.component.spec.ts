import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCardsListComponent } from './device-cards-list.component';

describe('MapOpModeSelectorComponent', () => {
  let component: DeviceCardsListComponent;
  let fixture: ComponentFixture<DeviceCardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceCardsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
