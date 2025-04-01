import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleModalPage } from './role-modal.page';

describe('RoleModalPage', () => {
  let component: RoleModalPage;
  let fixture: ComponentFixture<RoleModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
