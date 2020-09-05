import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagePeopleComponent } from './admin-manage-people.component';

describe('AdminManagePeopleComponent', () => {
  let component: AdminManagePeopleComponent;
  let fixture: ComponentFixture<AdminManagePeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManagePeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
