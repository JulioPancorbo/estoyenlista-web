import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllClientsPage } from './all-clients.page';

describe('AllClientsPage', () => {
  let component: AllClientsPage;
  let fixture: ComponentFixture<AllClientsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
