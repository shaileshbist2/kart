import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSampleComponent} from './user-sample.component';

describe('UserSampleComponent', () => {
  let component: UserSampleComponent;
  let fixture: ComponentFixture<UserSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserSampleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
