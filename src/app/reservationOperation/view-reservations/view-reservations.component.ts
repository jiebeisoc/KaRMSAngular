import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem, MessageService } from 'primeng/api';

import { Reservation } from '../../reservation';
import { ReservationService } from '../../reservation.service';
import { SessionService } from '../../session.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css'],
  providers: [MessageService],
})
export class ViewReservationsComponent implements OnInit {

  infoMessage: string;
  errorMessage: string;

  isUpcoming: string;
  detailsItems: MenuItem[];

  upcomingReservations: Reservation[];
  pastReservations: Reservation[];
  reservations: Reservation[];

  constructor(private router: Router,
    private messageService: MessageService,
    public sessionService: SessionService,
    private reservationService: ReservationService) {
      
      this.isUpcoming = "true";

      this.detailsItems = [
        {label: 'Update', icon: 'pi pi-refresh', command: () => {
          this.update();
        }},
        {label: 'Delete', icon: 'pi pi-times', command: () => {
          this.delete();
        }}
      ];
  }

  ngOnInit(): void {
    this.checkAccessRight();

    this.reservationService.retrieveUpcomingReservationByCustomer().subscribe(
      response => {
        this.upcomingReservations = response.reservations;
        this.reservations = this.upcomingReservations;
      },
      error => {
        console.log('********** ViewReservationsComponent.ts: ' + error);
      }
    )

    this.reservationService.retrievePastReservationByCustomer().subscribe(
      response => {
        this.pastReservations = response.reservations;
      },
      error => {
        console.log('********** ViewReservationsComponent.ts: ' + error);
      }
    )
    
  }

  checkAccessRight() {
		if(!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
  }

  onChange() {
    if (this.isUpcoming === "true") {
      this.reservations = this.upcomingReservations;
      console.log("upcoming");
    } else if (this.isUpcoming === "false") {
      this.reservations = this.pastReservations;
      console.log("past");
    }
  }

  formatDate(date: string) {
    var str = date.slice(0, date.indexOf("["));
    return str;
  }

  save() {
    this.messageService.add({severity:'info', detail:'save'})
  }

  update() {
    this.messageService.add({severity:'info', detail:'update'});
  }

  delete() {
    this.messageService.add({severity:'info', detail:'delete'});
  }
  
  clear() {
    this.isUpcoming = "true";
    this.messageService.clear();
  }

}
