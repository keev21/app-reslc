import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAdminRecipesPage } from './edit-admin-recipes.page';

describe('EditAdminRecipesPage', () => {
  let component: EditAdminRecipesPage;
  let fixture: ComponentFixture<EditAdminRecipesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminRecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
