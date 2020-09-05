import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserWhyDatakartComponent} from './user-whydatakart.component';

describe('UserWhyDatakartComponent', () => {
  let component: UserWhyDatakartComponent;
  let fixture: ComponentFixture<UserWhyDatakartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserWhyDatakartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWhyDatakartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
