import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminBranchPage } from './admin-branch.page';

describe('AdminBranchPage', () => {
  let component: AdminBranchPage;
  let fixture: ComponentFixture<AdminBranchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBranchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
