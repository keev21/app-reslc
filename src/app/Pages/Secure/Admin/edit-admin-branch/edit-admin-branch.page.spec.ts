import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAdminBranchPage } from './edit-admin-branch.page';

describe('EditAdminBranchPage', () => {
  let component: EditAdminBranchPage;
  let fixture: ComponentFixture<EditAdminBranchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminBranchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
