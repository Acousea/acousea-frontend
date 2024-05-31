import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSiteComponent } from './configuration-site.component';

describe('ConfigurationSiteComponent', () => {
  let component: ConfigurationSiteComponent;
  let fixture: ComponentFixture<ConfigurationSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigurationSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
