import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserTechSearchComponent} from './user-tech-search.component';

describe('UserTechSearchComponent', () => {
  let component: UserTechSearchComponent;
  let fixture: ComponentFixture<UserTechSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserTechSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTechSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
