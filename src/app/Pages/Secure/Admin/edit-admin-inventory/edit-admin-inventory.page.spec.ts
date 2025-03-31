import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAdminInventoryPage } from './edit-admin-inventory.page';

describe('EditAdminInventoryPage', () => {
  let component: EditAdminInventoryPage;
  let fixture: ComponentFixture<EditAdminInventoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminInventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
