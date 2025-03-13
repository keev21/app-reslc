import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFloorsPage } from './admin-floors.page';

describe('AdminFloorsPage', () => {
  let component: AdminFloorsPage;
  let fixture: ComponentFixture<AdminFloorsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFloorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
