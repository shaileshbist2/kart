import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserLeadSearchComponent} from './user-lead-search.component';

describe('UserLeadSearchComponent', () => {
  let component: UserLeadSearchComponent;
  let fixture: ComponentFixture<UserLeadSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserLeadSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLeadSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
