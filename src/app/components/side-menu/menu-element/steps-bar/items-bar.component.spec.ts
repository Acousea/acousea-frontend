import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsBarComponent } from './items-bar.component';

describe('ProgressBarComponent', () => {
  let component: ItemsBarComponent;
  let fixture: ComponentFixture<ItemsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
