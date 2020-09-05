import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserPeopleSearchComponent} from './user-people-search.component';

describe('UserPeopleSearchComponent', () => {
  let component: UserPeopleSearchComponent;
  let fixture: ComponentFixture<UserPeopleSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserPeopleSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPeopleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
