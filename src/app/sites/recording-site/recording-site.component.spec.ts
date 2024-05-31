import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingSiteComponent } from './recording-site.component';

describe('RecordingSiteComponent', () => {
  let component: RecordingSiteComponent;
  let fixture: ComponentFixture<RecordingSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordingSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordingSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
