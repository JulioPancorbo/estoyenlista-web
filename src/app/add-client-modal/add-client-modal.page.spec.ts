import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddClientModalPage } from './add-client-modal.page';

describe('AddClientModalPage', () => {
  let component: AddClientModalPage;
  let fixture: ComponentFixture<AddClientModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddClientModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
