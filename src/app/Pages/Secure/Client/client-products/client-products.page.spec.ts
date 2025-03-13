import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientProductsPage } from './client-products.page';

describe('ClientProductsPage', () => {
  let component: ClientProductsPage;
  let fixture: ComponentFixture<ClientProductsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
