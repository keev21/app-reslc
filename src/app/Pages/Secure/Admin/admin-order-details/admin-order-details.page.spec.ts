import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminOrderDetailsPage } from './admin-order-details.page';

describe('AdminOrderDetailsPage', () => {
  let component: AdminOrderDetailsPage;
  let fixture: ComponentFixture<AdminOrderDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
