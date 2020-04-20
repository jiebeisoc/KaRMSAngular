import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewReservationComponent } from './create-new-reservation.component';

describe('CreateNewReservationComponent', () => {
  let component: CreateNewReservationComponent;
  let fixture: ComponentFixture<CreateNewReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
