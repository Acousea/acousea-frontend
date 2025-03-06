import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeInfoComponent } from './node-info.component';

describe('SystemInfoSiteComponent', () => {
  let component: NodeInfoComponent;
  let fixture: ComponentFixture<NodeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
