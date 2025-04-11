import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEditStatusOrderDetailsPage } from './admin-edit-status-order-details.page';

describe('AdminEditStatusOrderDetailsPage', () => {
  let component: AdminEditStatusOrderDetailsPage;
  let fixture: ComponentFixture<AdminEditStatusOrderDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditStatusOrderDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
