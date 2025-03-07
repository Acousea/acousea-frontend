import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WavesSidebarComponent } from './waves-sidebar.component';

describe('WavesSidebarComponent', () => {
  let component: WavesSidebarComponent;
  let fixture: ComponentFixture<WavesSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WavesSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WavesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
