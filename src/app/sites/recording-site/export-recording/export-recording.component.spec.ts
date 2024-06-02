import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportRecordingComponent } from './export-recording.component';

describe('ExportRecordingComponent', () => {
  let component: ExportRecordingComponent;
  let fixture: ComponentFixture<ExportRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportRecordingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
