import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashHomeComponent } from './admin-dash-home.component';

describe('AdminDashHomeComponent', () => {
  let component: AdminDashHomeComponent;
  let fixture: ComponentFixture<AdminDashHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashHomeComponent]
    });
    fixture = TestBed.createComponent(AdminDashHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
