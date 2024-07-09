import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageStatusComponent } from './storage-status.component';

describe('StorageStatusComponent', () => {
  let component: StorageStatusComponent;
  let fixture: ComponentFixture<StorageStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StorageStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
