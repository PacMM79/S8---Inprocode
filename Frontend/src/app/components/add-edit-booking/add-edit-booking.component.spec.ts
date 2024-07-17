import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBookingComponent } from './add-edit-booking.component';

describe('AddEditBookingComponent', () => {
  let component: AddEditBookingComponent;
  let fixture: ComponentFixture<AddEditBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
