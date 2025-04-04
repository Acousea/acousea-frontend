import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeInformationSectionComponent } from './node-information-section.component';

describe('SystemInfoSiteComponent', () => {
  let component: NodeInformationSectionComponent;
  let fixture: ComponentFixture<NodeInformationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeInformationSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeInformationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
