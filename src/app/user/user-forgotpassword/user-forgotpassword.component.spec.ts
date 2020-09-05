import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserForgotPasswordComponent} from './user-forgotpassword.component';

describe('UserForgotPasswordComponent', () => {
  let component: UserForgotPasswordComponent;
  let fixture: ComponentFixture<UserForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserForgotPasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
