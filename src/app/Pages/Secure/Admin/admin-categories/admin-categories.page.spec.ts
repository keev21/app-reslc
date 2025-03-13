import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCategoriesPage } from './admin-categories.page';

describe('AdminCategoriesPage', () => {
  let component: AdminCategoriesPage;
  let fixture: ComponentFixture<AdminCategoriesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
