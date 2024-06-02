import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupRecordingComponent } from './setup-recording.component';

describe('SetupRecordingComponent', () => {
  let component: SetupRecordingComponent;
  let fixture: ComponentFixture<SetupRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupRecordingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
