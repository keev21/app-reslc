import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientInvoicesPage } from './client-invoices.page';

describe('ClientInvoicesPage', () => {
  let component: ClientInvoicesPage;
  let fixture: ComponentFixture<ClientInvoicesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientInvoicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
