import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../../session.service';
import { Reservation } from '../../reservation';
import { ReservationService } from '../../reservation.service';
import { Outlet } from '../../outlet';
import { OutletService } from '../../outlet.service';
import { RoomType } from '../../room-type';
import { RoomTypeService } from '../../room-type.service';
import { Room } from '../../room';
import { RoomService } from '../../room.service';
import { Promotion } from '../../promotion';
import { PromotionService } from '../../promotion.service';

import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.css']
})
export class UpdateReservationComponent implements OnInit {

  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#424242',
        buttonColor: '#fff'
    },
    dial: {
        dialBackgroundColor: '#555',
    },
    clockFace: {
        clockFaceBackgroundColor: '#555',
        clockHandColor: '#9fbd90',
        clockFaceTimeInactiveColor: '#fff'
    }
  };

  submitted: boolean;
  reservationToUpdate: Reservation;
  outletId: number;
  roomTypeId: number;
  roomId: number;
  promotionId: number;

  outlets: Outlet[]
  roomTypes: RoomType[];
  rooms: Room[];
  promotions: Promotion[];

  isValid: boolean;
  capacity: number;

  minDate: Date;
  maxDate: Date;
  minTime: string;
  maxTime: string;
  combinedDate: Date;
  dateUpdate: Date;
  timeUpdate: string;

  newPoints: number = 0;
  oldPoints: number = 0; 

  constructor(private router: Router,
    public sessionService: SessionService,
    private reservationService: ReservationService,
    private outletService: OutletService,
    private roomTypeService: RoomTypeService,
    private roomService: RoomService,
    private promotionService: PromotionService,
    private formBuilder: FormBuilder,
    private dialog: MatSnackBar) {

      this.submitted = false;
      this.reservationToUpdate = sessionService.getSelectedReservation();
      this.outletId = this.reservationToUpdate.outlet.outletId;
      this.roomTypeId = this.reservationToUpdate.room.roomType.roomTypeId;
      this.roomId = this.reservationToUpdate.room.roomId;
      this.promotionId = this.reservationToUpdate.promotion.promotionId;
     }

  ngOnInit(): void {
    this.checkAccessRight();
    

    this.outletService.retrieveAllOutlets().subscribe(
      response => {
        this.outlets = response.outlets;
      }
    );

    this.roomTypeService.retrieveAllRoomType().subscribe(
      response => {
        this.roomTypes = response.roomTypes;
        this.capacity = this.roomTypes[this.roomTypeId-1].capacity;
        console.log(this.capacity);
      }
    );

    this.dateUpdate = moment(this.formatDate(this.reservationToUpdate.date)).toDate();
    this.timeUpdate = moment(this.formatDate(this.reservationToUpdate.date)).format('h:mm a');
    console.log(this.dateUpdate);
    console.log(this.timeUpdate);
    this.setMinMaxDateTime();

    this.roomService.retrieveAvailableRooms(this.dateUpdate.getTime(), this.reservationToUpdate.duration, this.outletId, this.roomTypeId).subscribe(
      response => {
        this.rooms = response.rooms;  
        this.rooms.push(this.reservationToUpdate.room);   
      },
      error => {
        console.log("******** UpdateReservationComponent.ts: "  + error);
      }
    );

    this.promotionService.retrievePromotionsByTime(this.dateUpdate.getTime()).subscribe(
      response => {
        this.promotions = response.promotions;
      },
      error => {
        console.log("******** UpdateReservationComponent.ts: "  + error);
      }
    );

    this.isValid = true;
  }

  setMinMaxDateTime() {
    this.minTime = "12:00 pm"
    this.maxTime = "11:00 pm"

    var today = new Date();

    if (this.dateUpdate.getFullYear() === today.getFullYear() && this.dateUpdate.getMonth() === today.getMonth() && this.dateUpdate.getDate() === today.getDate() && today.getHours() >= 12) {
      var hours = today.getHours();
      this.minTime = hours + ":00 pm"
      console.log("**** today");
    } else {
      this.minTime = "12:00 pm"
      console.log("*** not today");
    }

    this.minDate = today;
    this.maxDate = new Date(today);
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
  }

  formatDate(date: Date) {
    var str = date.toString().slice(0, date.toString().indexOf("["));
    return str;
  }

  roomTypeChange() {
    this.capacity = this.roomTypes[this.roomTypeId-1].capacity;

    this.onChange();
  }

  dateChange() {
    console.log("date: " + this.dateUpdate);
    var today = new Date();

    if (this.dateUpdate.getFullYear() === today.getFullYear() && this.dateUpdate.getMonth() === today.getMonth() && this.dateUpdate.getDate() === today.getDate() && today.getHours() >= 12) {
      var hours = today.getHours();
      this.minTime = hours + ":00 pm"
      console.log("**** today");
    } else {
      this.minTime = "12:00 pm"
      console.log("*** not today");
    }

    this.dateTime();

    this.promotionService.retrievePromotionsByTime(this.combinedDate.getTime()).subscribe(
      response => {
        this.promotions = response.promotions;
      },
      error => {
        console.log("******** UpdateReservationComponent.ts: "  + error);
      }
    );

    this.onChange();
  }

  dateTime() {
    
    var year = this.dateUpdate.getFullYear();
    var month = this.dateUpdate.getMonth() + 1; // Jan is 0, dec is 11
    var day = this.dateUpdate.getDate(); 
    var dateString = '' + year + '-' + month + '-' + day;

    this.combinedDate = moment(dateString + " " + this.timeUpdate, 'YYYY-MM-DD h:mm a').toDate();
    console.log(this.combinedDate);
  }

  onChange() {
    this.dateTime();
    console.log(this.outletId);

    this.roomService.retrieveAvailableRooms(this.combinedDate.getTime(), this.reservationToUpdate.duration, this.outletId, this.roomTypeId).subscribe(
      response => {
        this.isValid = true;

        this.rooms = response.rooms;
        if (this.roomTypeId === this.reservationToUpdate.room.roomType.roomTypeId && this.outletId === this.reservationToUpdate.outlet.outletId) {
          this.rooms.push(this.reservationToUpdate.room);
        }  
      },
      error => {
        this.isValid = false;

        var string = error.slice(error.lastIndexOf(":")+2);
        if (string === "undefined") {
          this.dialog.open("Invalid options!", '', {
            duration: 5000,
            panelClass: ['snackbar']
          });
        } else {
          this.dialog.open(string, '', {
            duration: 5000,
            panelClass: ['snackbar']
          });
        }
        console.log("******** UpdateReservationComponent.ts: "  + error);
      }
    );
    this.calculateTotalPrice();
  }

  calculateTotalPrice(){

    if (!this.promotionId) {
      this.promotionId = 0;
    }
    this.dateTime();

    this.reservationService.calculateTotalPrice(this.combinedDate.getTime(), this.reservationToUpdate.duration, this.roomTypeId, this.promotionId).subscribe(
      response => {
        this.reservationToUpdate.totalPrice = response.totalPrice;
        this.reservationToUpdate.totalPrice = this.reservationToUpdate.totalPrice - this.newPoints; //when promotion changes
      },
      error => {
        var string = error.slice(error.lastIndexOf(":")+2);
        if (string === "undefined") {
          this.dialog.open("Invalid options!", '', {
            duration: 5000,
            panelClass: ['snackbar']
          });
        } else {
          this.dialog.open(string, '', {
            duration: 5000,
            panelClass: ['snackbar']
          });
        }
        console.log("******** UpdateReservationComponent.ts: "  + error);
      }
    );
  }

  pointsChange() {
    this.newPoints = this.reservationToUpdate.pointsRedeemed;
    this.reservationToUpdate.totalPrice = this.reservationToUpdate.totalPrice + this.oldPoints - this.newPoints;
    console.log("New value: " + this.newPoints + "\n" + "Old value: " + this.oldPoints);
    this.oldPoints = this.newPoints;
  }

  update(updateProductForm: NgForm) {
    this.submitted = true;
    this.reservationToUpdate.date = this.combinedDate;
    console.log(this.reservationToUpdate.note);

    if (updateProductForm.valid) {
      this.reservationService.updateReservation(this.reservationToUpdate, this.roomId, this.outletId, this.promotionId).subscribe(
        response => {
          this.dialog.open("Reservation is updated successfully!", '', {
            duration: 5000,
            panelClass: ['snackbar']
          });

          this.router.navigate(["/reservationOperation/viewReservations"]);
        },
        error => {
          var string = error.slice(error.lastIndexOf(":")+2);
          if (string === "undefined") {
            this.dialog.open("Invalid options!", '', {
              duration: 5000,
              panelClass: ['snackbar']
            });
          } else {
            this.dialog.open(string, '', {
              duration: 5000,
              panelClass: ['snackbar']
            });
          }
          console.log("******** UpdateReservationComponent.ts: "  + error);
        }
      );

    } else {
      console.log("Form not valid");
    } 
  }
 
  test() {
    console.log("outletId: " + this.outletId);
    console.log("roomTypeId: " + this.roomTypeId);
    console.log("date: " + this.reservationToUpdate.date);
    console.log("duration: " + this.reservationToUpdate.duration);
    console.log("roomId: " + this.roomId);
    console.log("noOfPeople: " + this.reservationToUpdate.numOfPeople);
    console.log("note: " + this.reservationToUpdate.note);
    console.log("promotionId: " + this.promotionId);
    console.log("pointsRedeemed: " + this.reservationToUpdate.pointsRedeemed);
    console.log("totalPrice: " + this.reservationToUpdate.totalPrice);
  }

  checkAccessRight() {
		if(!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
  }

  clear() {
		this.reservationToUpdate = null;
  }

  get customerPoints(): number {
    return this.sessionService.getCurrentCustomer().points;
  }


}
