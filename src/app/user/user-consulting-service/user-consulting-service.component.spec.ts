import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserConsultingServiceComponent} from './user-consulting-service.component';

describe('UserConsultingServiceComponent', () => {
  let component: UserConsultingServiceComponent;
  let fixture: ComponentFixture<UserConsultingServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserConsultingServiceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConsultingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
