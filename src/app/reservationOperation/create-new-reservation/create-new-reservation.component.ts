import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Customer } from '../../customer';
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

@Component({
  selector: 'app-create-new-reservation',
  templateUrl: './create-new-reservation.component.html',
  styleUrls: ['./create-new-reservation.component.css']
})
export class CreateNewReservationComponent implements OnInit {

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
  newReservation: Reservation;
  outletId: number;
  roomTypeId: number;
  roomId: number;
  promotionId: number;
  totalPrice: number;
  pointsRedeemed: number;
  status: string;

  outlets: Outlet[]
  roomTypes: RoomType[];
  rooms: Room[];
  promotions: Promotion[];

  reservationFormGroup: FormGroup;

  minDate: Date;
  maxDate: Date;
  minTime: string;
  maxTime: string;
  combinedDate: Date;

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
      this.newReservation = new Reservation();
     }

  ngOnInit(): void {
    this.checkAccessRight();
    this.setMinMaxDateTime();

    this.outletService.retrieveAllOutlets().subscribe(
      response => {
        this.outlets = response.outlets;
      }
    )

    this.roomTypeService.retrieveAllRoomType().subscribe(
      response => {
        this.roomTypes = response.roomTypes;
      }
    )

    this.reservationFormGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          outletCtrl: ['', Validators.required],
          roomTypeCtrl: ['', Validators.required],
          dateCtrl: [moment(new Date()), Validators.required],
          timeCtrl: ['', Validators.required],
          durationCtrl: ['', Validators.required],
          'invalid': true
        }),
        this.formBuilder.group({
          roomCtrl: ['', Validators.required],
          noOfPeopleCtrl: ['', Validators.required],
          noteCtrl: ['', Validators.nullValidator]
        }),
        this.formBuilder.group({
          promotionCtrl: ['', Validators.nullValidator],
          pointsCtrl: ['', Validators.nullValidator],
          paymentMethodCtrl: ['', Validators.required]
        })
      ])
    });

  }

  setMinMaxDateTime() {
    this.minTime = "12:00 pm"
    this.maxTime = "11:00 pm"
    
    var date = new Date();

    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    
    var hour = date.getHours();
    
    if (hour > 23) { // after closing hours
      date.setDate(date.getDate() + 1);
      date.setHours(12);
    } else if (hour < 12) { // before opening hours
      date.setHours(12);
    } else {
      this.minTime = hour + ":00 pm";
    }

    this.minDate = date;
    this.maxDate = new Date(date);
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
  }

  dateChange() {
    var date = new Date(this.dateCtrl.value);
    //console.log("dateCtrl: " + date);
    var today = new Date();

    if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate() && today.getHours() >= 12) {
      var hours = today.getHours();
      this.minTime = hours + ":00 pm"
      //console.log("**** today");
    } else {
      this.minTime = "12:00 pm"
      //console.log("*** not today");
    }
    this.timeCtrl.setValue(this.minTime);
    this.formArray.get([0]).setErrors({ 'invalid': true });
  }

  dateTime() {
    var date = new Date(this.dateCtrl.value);
    var timeString = this.timeCtrl.value;
    
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    var day = date.getDate(); 
    var dateString = '' + year + '-' + month + '-' + day;

    this.combinedDate = moment(dateString + " " + timeString, 'YYYY-MM-DD h:mm a').toDate();
    console.log(this.combinedDate);
  }

  onChange() {
    this.formArray.get([0]).setErrors({ 'invalid': true });
  }

  onCheck() {
    this.dateTime();

    this.roomService.retrieveAvailableRooms(this.combinedDate.getTime(), this.durationCtrl.value, this.outletCtrl.value.outletId, this.roomTypeCtrl.value.roomTypeId).subscribe(
      response => {
        this.formArray.get([0]).setErrors(null);
        this.rooms = response.rooms; 

        this.outletId = this.outletCtrl.value.outletId;
        this.roomTypeId = this.roomTypeCtrl.value.roomTypeId;
        this.newReservation.date = this.combinedDate;
        this.newReservation.duration = this.durationCtrl.value; 

        this.dialog.open("Rooms are available!", '', {
          duration: 5000,
          panelClass: ['snackbar']
        });     
      },
      error => {
        this.formArray.get([0]).setErrors({ 'invalid': true });
        
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
        console.log("******** CreateNewReservationComponent.ts: "  + error);
      }
    );
  }

  calculateTotalPrice(){

    if (!this.promotionCtrl.value) {
      this.promotionId = 0;
    } else {
      this.promotionId = this.promotionCtrl.value.promotionId;
    }

    this.reservationService.calculateTotalPrice(this.newReservation.date.getTime(), this.newReservation.duration, this.roomTypeId, this.promotionId).subscribe(
      response => {
        this.totalPrice = response.totalPrice;
        this.totalPrice = this.totalPrice - this.newPoints; //when promotion changes
      },
      error => {
        console.log("******** CreateNewReservationComponent.ts: "  + error);
      }
    );
  }

  onMakePayment() {
    this.roomId = this.roomCtrl.value.roomId;
    this.newReservation.numOfPeople = this.noOfPeopleCtrl.value;
    this.newReservation.note = this.noteCtrl.value;

    this.promotionService.retrievePromotionsByTime(this.newReservation.date.getTime()).subscribe(
      response => {
        this.promotions = response.promotions;
      },
      error => {
        console.log("******** CreateNewReservationComponent.ts: "  + error);
      }
    );
    this.calculateTotalPrice();
  }

  pointsChange() {
    this.newPoints = this.pointsCtrl.value;
    this.totalPrice = this.totalPrice + this.oldPoints - this.newPoints;
    console.log("New value: " + this.newPoints + "\n" + "Old value: " + this.oldPoints);
    this.oldPoints = this.newPoints;
  }

  test() {
    console.log("outletId: " + this.outletId);
    console.log("roomTypeId: " + this.roomTypeId);
    console.log("date: " + this.newReservation.date);
    console.log("duration: " + this.newReservation.duration);
    console.log("roomId: " + this.roomId);
    console.log("noOfPeople: " + this.newReservation.numOfPeople);
    console.log("note: " + this.newReservation.note);
    console.log("promotionId: " + this.promotionId);
    console.log("pointsRedeemed: " + this.pointsRedeemed);
    console.log("status: " + this.status);
    console.log("totalPrice: " + this.totalPrice);
  }

  create() {
    this.pointsRedeemed = this.pointsCtrl.value;
    this.status = this.paymentMethodCtrl.value;
    this.newReservation.totalPrice = this.totalPrice;

    this.reservationService.createNewReservation(this.newReservation, this.roomId, this.outletId, this.promotionId, this.pointsRedeemed, this.status).subscribe(
      response => {
        this.dialog.open("Reservation is successfully created!", '', {
          duration: 5000,
          panelClass: ['snackbar']
        });
      },
      error => {
        this.dialog.open("An error occurred while creating new reservation!", '', {
          duration: 5000,
          panelClass: ['snackbar']
        });
        console.log("******** CreateNewReservationComponent.ts: "  + error);
      }
    );

    this.test();
  }

  checkAccessRight() {
		if(!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
  }

  clear() {
		this.submitted = false;
		this.newReservation = new Reservation();
	}

  get formArray(): AbstractControl | null { 
    return this.reservationFormGroup.get('formArray'); 
  }

  get outletCtrl(): AbstractControl | null { 
    return this.formArray.get([0]).get('outletCtrl'); 
  }

  get roomTypeCtrl(): AbstractControl | null { 
    return this.formArray.get([0]).get('roomTypeCtrl'); 
  }

  get dateCtrl(): AbstractControl | null { 
    return this.formArray.get([0]).get('dateCtrl'); 
  }

  get timeCtrl(): AbstractControl | null { 
    return this.formArray.get([0]).get('timeCtrl'); 
  }

  get durationCtrl(): AbstractControl | null { 
    return this.formArray.get([0]).get('durationCtrl'); 
  }

  get roomCtrl(): AbstractControl | null { 
    return this.formArray.get([1]).get('roomCtrl'); 
  }

  get noOfPeopleCtrl(): AbstractControl | null { 
    return this.formArray.get([1]).get('noOfPeopleCtrl'); 
  }

  get noteCtrl(): AbstractControl | null { 
    return this.formArray.get([1]).get('noteCtrl'); 
  }

  get promotionCtrl(): AbstractControl | null { 
    return this.formArray.get([2]).get('promotionCtrl'); 
  }

  get pointsCtrl(): AbstractControl | null { 
    return this.formArray.get([2]).get('pointsCtrl'); 
  }

  get paymentMethodCtrl(): AbstractControl | null { 
    return this.formArray.get([2]).get('paymentMethodCtrl'); 
  }

  get customerPoints(): number {
    return this.sessionService.getCurrentCustomer().points;
  }
}
