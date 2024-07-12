import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingConfigComponent } from './streaming-config.component';

describe('RecordingAndProcessingConfigComponent', () => {
  let component: StreamingConfigComponent;
  let fixture: ComponentFixture<StreamingConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamingConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
