import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RrppDetailsPage } from './rrpp-details.page';

describe('RrppDetailsPage', () => {
  let component: RrppDetailsPage;
  let fixture: ComponentFixture<RrppDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RrppDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
