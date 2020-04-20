import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Reservation } from '../../reservation';
import { ReservationService } from '../../reservation.service';
import { SessionService } from '../../session.service';
import { Outlet } from '../../outlet';
import { RoomType } from '../../room-type';
import { Room } from '../../room';


@Component({
  selector: 'app-create-new-reservation',
  templateUrl: './create-new-reservation.component.html',
  styleUrls: ['./create-new-reservation.component.css']
})
export class CreateNewReservationComponent implements OnInit {

  submitted: boolean;
  newReservation: Reservation;
  roomId: number;
  outletId: number;
  promotionId: number;

  infoMessage: string;
  errorMessage: string;

  outlets: Outlet[]
  roomTypes: RoomType[];
  rooms: Room;


  constructor(private router: Router,
    public sessionService: SessionService,
    private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.checkAccessRight();
  }

  checkAccessRight() {
		if(!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
  }

}
