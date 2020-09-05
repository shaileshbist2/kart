import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserOurServicesComponent} from './user-ourservices.component';

describe('UserOurServicesComponent', () => {
  let component: UserOurServicesComponent;
  let fixture: ComponentFixture<UserOurServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserOurServicesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOurServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
