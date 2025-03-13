import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRecipesPage } from './admin-recipes.page';

describe('AdminRecipesPage', () => {
  let component: AdminRecipesPage;
  let fixture: ComponentFixture<AdminRecipesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
