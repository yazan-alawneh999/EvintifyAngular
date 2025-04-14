import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifiComponent } from './notifi.component';

describe('NotifiComponent', () => {
  let component: NotifiComponent;
  let fixture: ComponentFixture<NotifiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifiComponent]
    });
    fixture = TestBed.createComponent(NotifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
