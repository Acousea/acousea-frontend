import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingAndProcessingConfigComponent } from './recording-and-processing-config.component';

describe('RecordingAndProcessingConfigComponent', () => {
  let component: RecordingAndProcessingConfigComponent;
  let fixture: ComponentFixture<RecordingAndProcessingConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordingAndProcessingConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordingAndProcessingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
