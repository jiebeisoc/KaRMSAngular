import { Component, OnInit } from '@angular/core';

import { Reservation } from '../../reservation';
import { ReservationService } from '../../reservation.service';
import { SessionService } from '../../session.service';

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css']
})
export class ViewReservationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
