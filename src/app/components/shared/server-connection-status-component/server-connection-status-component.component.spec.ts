import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerConnectionStatusComponentComponent } from './server-connection-status-component.component';

describe('ServerConnectionStatusComponentComponent', () => {
  let component: ServerConnectionStatusComponentComponent;
  let fixture: ComponentFixture<ServerConnectionStatusComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerConnectionStatusComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerConnectionStatusComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
