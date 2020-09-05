import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserPriceComponent} from './user-price.component';

describe('UserDashboardComponent', () => {
  let component: UserPriceComponent;
  let fixture: ComponentFixture<UserPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserPriceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
