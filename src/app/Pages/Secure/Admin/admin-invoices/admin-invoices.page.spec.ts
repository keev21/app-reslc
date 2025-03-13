import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminInvoicesPage } from './admin-invoices.page';

describe('AdminInvoicesPage', () => {
  let component: AdminInvoicesPage;
  let fixture: ComponentFixture<AdminInvoicesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInvoicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
