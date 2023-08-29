import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformsettingsComponent } from './platformsettings.component';

describe('PlatformsettingsComponent', () => {
  let component: PlatformsettingsComponent;
  let fixture: ComponentFixture<PlatformsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformsettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
