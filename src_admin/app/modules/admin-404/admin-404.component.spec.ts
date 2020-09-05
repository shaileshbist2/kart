import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin404Component } from './admin-404.component';

describe('Admin404Component', () => {
  let component: Admin404Component;
  let fixture: ComponentFixture<Admin404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Admin404Component ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Admin404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
