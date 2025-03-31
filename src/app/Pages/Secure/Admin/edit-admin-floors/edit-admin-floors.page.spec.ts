import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAdminFloorsPage } from './edit-admin-floors.page';

describe('EditAdminFloorsPage', () => {
  let component: EditAdminFloorsPage;
  let fixture: ComponentFixture<EditAdminFloorsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminFloorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
