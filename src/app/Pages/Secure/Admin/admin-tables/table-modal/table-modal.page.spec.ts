import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModalPage } from './table-modal.page';

describe('TableModalPage', () => {
  let component: TableModalPage;
  let fixture: ComponentFixture<TableModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TableModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
