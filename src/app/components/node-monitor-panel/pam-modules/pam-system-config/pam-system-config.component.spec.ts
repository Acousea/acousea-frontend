import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PamSystemConfigComponent } from './pam-system-config.component';

describe('DataCollectionConfigComponent', () => {
  let component: PamSystemConfigComponent;
  let fixture: ComponentFixture<PamSystemConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PamSystemConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PamSystemConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
