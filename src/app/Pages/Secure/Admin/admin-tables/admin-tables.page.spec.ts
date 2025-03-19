import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTablesPage } from './admin-tables.page';

describe('AdminTablesPage', () => {
  let component: AdminTablesPage;
  let fixture: ComponentFixture<AdminTablesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
