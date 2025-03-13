import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientCategoriesPage } from './client-categories.page';

describe('ClientCategoriesPage', () => {
  let component: ClientCategoriesPage;
  let fixture: ComponentFixture<ClientCategoriesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
