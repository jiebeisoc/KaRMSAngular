import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Reservation } from '../../reservation';
import { ReservationService } from '../../reservation.service';
import { SessionService } from '../../session.service';
import { error } from '@angular/compiler/src/util';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ViewReservation {
  selectedReservation: Reservation;
  promotionString: string;
  noteString: string;
}

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css'],
})
export class ViewReservationsComponent implements OnInit {

  infoMessage: string;
  errorMessage: string;

  isUpcoming: string;

  promotionString: string;
  noteString: string;

  upcomingReservations: Reservation[];
  pastReservations: Reservation[];
  reservations: Reservation[];

  constructor(private router: Router,
    public sessionService: SessionService,
    private reservationService: ReservationService,
    private dialog: MatDialog) {
      
      this.isUpcoming = "true";
  }

  ngOnInit(): void {
    this.checkAccessRight();

    this.reservationService.retrieveUpcomingReservationByCustomer().subscribe(
      response => {
        this.upcomingReservations = response.reservations;
        this.reservations = this.upcomingReservations.sort((a, b) => new Date(this.formatDate(a.date.toString())).getTime() - new Date(this.formatDate(b.date.toString())).getTime());
      },
      error => {
        console.log('********** ViewReservationsComponent.ts: ' + error);
      }
    )

    this.reservationService.retrievePastReservationByCustomer().subscribe(
      response => {
        this.pastReservations = response.reservations;
        this.pastReservations.sort((a, b) => new Date(this.formatDate(a.date.toString())).getTime() - new Date(this.formatDate(b.date.toString())).getTime());
      },
      error => {
        console.log('********** ViewReservationsComponent.ts: ' + error);
      }
    )
    
  }

  onChange() {
    if (this.isUpcoming === "true") {
      this.reservations = this.upcomingReservations;
      //console.log("upcoming");
    } else if (this.isUpcoming === "false") {
      this.reservations = this.pastReservations;
      //console.log("past");
    }
  }

  formatDate(date: string) {
    var str = date.slice(0, date.indexOf("["));
    return str;
  }

  openViewDialog(reservation: Reservation): void {

    this.sessionService.setSelectedReservation(reservation);
    console.log("reservation: " + this.sessionService.getSelectedReservation().reservationId);

    if (!reservation.promotion) {
      this.promotionString = "-";
      console.log("promotion does not exist");
    } else {
      this.promotionString = reservation.promotion.promotionName;
      console.log("promotion exist");
    }

    if (!reservation.note) {
      this.noteString = "-";
    } else {
      this.noteString = reservation.note;
    }

    const dialogRef = this.dialog.open(ViewDialogComponent, {
      width: '400px',
      data: {selectedReservation: reservation, promotionString: this.promotionString, noteString: this.noteString},
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.sessionService.setSelectedReservation(null);
        console.log('viewDialog was closed');
      }
    );
  }

  viewSongQueue(reservation: Reservation) {
    this.sessionService.setSelectedReservation(reservation);
    this.router.navigate(["/songOperation/songQueue"]);
  }

  clear() {
    this.isUpcoming = "true";
  }

  checkAccessRight() {
		if(!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
  }
}

@Component({
    selector: 'view-dialog',
    templateUrl: 'view-dialog.html',
  })
  export class ViewDialogComponent {
  
    constructor(
      public dialogRef: MatDialogRef<ViewDialogComponent>, 
      @Inject(MAT_DIALOG_DATA) public data: ViewReservation,
      private dialog: MatDialog,
      private reservationService: ReservationService, 
      private sessionService: SessionService,
      private snackBar: MatSnackBar, 
      private router: Router) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    formatDate(date: Date) {
      var str = date.toString().slice(0, date.toString().indexOf("["));
      return str;
    }

    onUpdate() {
      if (this.sessionService.getSelectedReservation().status === "PAID") {
        this.snackBar.open("Reservation is paid, no changes can be made!", '', {
          duration: 5000,
          panelClass: ['snackbar']
        });
      } else {
        this.dialogRef.close();
        this.router.navigate(["/reservationOperation/updateReservation"]);
      }
      
    }

    deleteReservation() {

      this.reservationService.deleteReservation(this.sessionService.getSelectedReservation().reservationId).subscribe(
        response => {
          this.snackBar.open('Reservation is deleted successfully!', '', {
            duration: 5000,
            panelClass: ['snackbar']
          });
          window.location.reload();
        },
        error => {
          this.snackBar.open("An error has occurred while deleting the reservation!", '', {
            duration: 5000,
            panelClass: ['snackbar']
          });
          console.log("******** ViewReservationsComponent.ts: "  + error);
        }
      )
    }
  
    deleteDialog(): void {

      console.log(this.sessionService.getSelectedReservation().reservationId);

      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        disableClose: false
      });
  
      dialogRef.afterClosed().subscribe(
        result => {
          if (result) {
            this.deleteReservation();
          }
        }
      );
    }
  
  }

  @Component({
    selector: 'delete-dialog',
    templateUrl: 'delete-dialog.html',
  })
  export class DeleteDialogComponent {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteDialogComponent>) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }