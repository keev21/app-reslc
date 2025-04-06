import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAdminProductsPage } from './edit-admin-products.page';

describe('EditAdminProductsPage', () => {
  let component: EditAdminProductsPage;
  let fixture: ComponentFixture<EditAdminProductsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
