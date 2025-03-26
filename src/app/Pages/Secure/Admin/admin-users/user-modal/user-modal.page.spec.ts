import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserModalPage } from './user-modal.page';

describe('UserModalPage', () => {
  let component: UserModalPage;
  let fixture: ComponentFixture<UserModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
