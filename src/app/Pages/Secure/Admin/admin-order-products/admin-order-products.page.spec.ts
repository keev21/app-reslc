import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminOrderProductsPage } from './admin-order-products.page';

describe('AdminOrderProductsPage', () => {
  let component: AdminOrderProductsPage;
  let fixture: ComponentFixture<AdminOrderProductsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
