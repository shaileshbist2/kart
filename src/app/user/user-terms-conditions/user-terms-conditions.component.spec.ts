import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserTermsConditionsComponent} from './user-terms-conditions.component';

describe('UserTermsConditionsComponent', () => {
  let component: UserTermsConditionsComponent;
  let fixture: ComponentFixture<UserTermsConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserTermsConditionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
