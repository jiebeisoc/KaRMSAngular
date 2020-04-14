import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import * as moment from 'moment';

import { SessionService } from '../session.service';
import { CustomerService } from '../customer.service';
import { OutletService } from '../outlet.service';
import { ReservationService } from '../reservation.service'; 
import { RoomTypeService } from '../room-type.service';
import { RoomService } from '../room.service';

import { Outlet } from '../outlet';
import { Customer } from '../customer';
import { Reservation } from '../reservation';
import { RoomType } from '../room-type';
import { Room } from '../room';

export class RoomAvailable {
  roomNum: string;
  hour12: boolean = true;
  hour13: boolean = true;
  hour14: boolean = true;
  hour15: boolean = true;
  hour16: boolean = true;
  hour17: boolean = true;
  hour18: boolean = true;
  hour19: boolean = true;
  hour20: boolean = true;
  hour21: boolean = true;
  hour22: boolean = true;
  hour23: boolean = true;

  constructor(roomNum?: string) {
    this.roomNum = roomNum;
  }
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [DatePipe]
})
export class IndexComponent implements OnInit {

  username: string;
  password: string;
  loginError: boolean;
  errorMessage: string;
  outlets: Outlet[];
  roomTypes: RoomType[];
  reservations: Reservation[];
  selectedOutlet: Outlet;
  selectedDate: Date;
  selectedRoomType: RoomType;
  minDate: Date;
  data: boolean[];
  roomsAvailable: RoomAvailable[] = [];
  rooms: Room[];

  displayedColumns: string[] = ['roomNum','hour12', 'hour13', 'hour14', 'hour15', 'hour16', 'hour17', 'hour18', 'hour19', 'hour20', 'hour21', 'hour22', 'hour23'];

  constructor(private router: Router,
    public datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    public customerService: CustomerService,
    public outletService: OutletService, 
    public reservationService: ReservationService,
    public roomTypeService: RoomTypeService,
    public roomService: RoomService) {
      this.loginError = false;
      this.minDate = new Date();
      this.outlets = new Array();
     }

  ngOnInit(): void {
    
    this.outletService.retrieveAllOutlets().subscribe(
      response => {
        this.outlets = response.outlets;
      }
    );
    this.roomTypeService.retrieveAllRoomType().subscribe(
      response => {
        this.roomTypes = response.roomTypes;
      }
    );
  }

  customerLogin(loginForm: NgForm): void {

    if (loginForm.valid) {
      this.sessionService.setUsername(this.username);
      this.sessionService.setPassword(this.password);
      
      this.customerService.customerLogin(this.username, this.password).subscribe(

        response => {
          let customer: Customer = response.customer;

          if (customer != null) {
            this.sessionService.setIsLogin(true);
            this.sessionService.setCurrentCustomer(customer);

            this.loginError = false;

            this.router.navigate(["/index"]);
          } else {
            this.loginError = true;
          }
        },
        error => {
          this.loginError = true;
          this.errorMessage = error;
        }

      )
    }
  }

  viewAvailable() {
    this.roomsAvailable = [];
    this.roomService.retrieveRoomByOutletAndRoomType(this.selectedOutlet.outletId, this.selectedRoomType.roomTypeId).subscribe(
      response => {
        console.log(response)
        this.rooms = response.rooms;

        for (let room of this.rooms) {
          let reservations: Reservation[];
          this.reservationService.retrieveReservationByRoomAndDate(this.datePipe.transform(this.selectedDate, "dd/MM/yyyy"), room).subscribe(
            response => {
              reservations = response.reservations;
              if (reservations.length == 0) {
                this.roomsAvailable.push(new RoomAvailable(room.roomNum));
              } else {
                let roomAvailable = new RoomAvailable(room.roomNum);
                for (let reservation of reservations) {
                  let duration: number = reservation.duration;
                  console.log(reservation.date);
                  let date: string = reservation.date.toString();
                  console.log(date);
                  let hour: number = Number(date.substring(11,13));
                  console.log(hour);
                  for (let i = 0; i < duration; i++) {
                    if (hour == 4) {
                      roomAvailable.hour12 = false;
                    } else if (hour == 5) {
                      roomAvailable.hour13 = false;
                    } else if (hour == 6) {
                      roomAvailable.hour14 = false;
                    } else if (hour == 7) {
                      roomAvailable.hour15 = false;
                    } else if (hour == 8) {
                      roomAvailable.hour16 = false;
                    } else if (hour == 9) {
                      roomAvailable.hour17= false;
                    } else if (hour == 10) {
                      roomAvailable.hour18 = false;
                    } else if (hour == 11) {
                      roomAvailable.hour19 = false;
                    } else if (hour == 12) {
                      roomAvailable.hour20 = false;
                    } else if (hour == 13) {
                      roomAvailable.hour21 = false;
                    } else if (hour == 14) {
                      roomAvailable.hour22 = false;
                    } else {
                      roomAvailable.hour23 = false;
                    }
                    hour++;
                  }
                  this.roomsAvailable.push(roomAvailable);
                }
              }
            }
          );
        }
        console.log(this.roomsAvailable);
      }
     
    );
  }

}
