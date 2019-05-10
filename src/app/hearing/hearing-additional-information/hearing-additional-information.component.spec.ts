import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingAdditionalInformationComponent } from './hearing-additional-information.component';

describe('HearingAdditionalInformationComponent', () => {
  let component: HearingAdditionalInformationComponent;
  let fixture: ComponentFixture<HearingAdditionalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingAdditionalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingAdditionalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
