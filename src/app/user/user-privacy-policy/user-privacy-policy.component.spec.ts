import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserPrivacyPolicyComponent} from './user-privacy-policy.component';

describe('UserPrivacyPolicyComponent', () => {
  let component: UserPrivacyPolicyComponent;
  let fixture: ComponentFixture<UserPrivacyPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserPrivacyPolicyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
