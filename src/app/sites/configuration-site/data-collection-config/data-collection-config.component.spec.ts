import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCollectionConfigComponent } from './data-collection-config.component';

describe('DataCollectionConfigComponent', () => {
  let component: DataCollectionConfigComponent;
  let fixture: ComponentFixture<DataCollectionConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataCollectionConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCollectionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
