import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageFieldComponent } from './admin-manage-field.component';

describe('AdminManageFieldComponent', () => {
  let component: AdminManageFieldComponent;
  let fixture: ComponentFixture<AdminManageFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
