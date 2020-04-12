import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { SessionService } from '../session.service';
import { CustomerService } from '../customer.service';
import { OutletService } from '../outlet.service';
import { ReservationService } from '../reservation.service'; 

import { Outlet } from '../outlet';
import { Customer } from '../customer';
import { Reservation } from '../reservation';

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
  reservations: Reservation[];
  selectedOutlet: Outlet;
  selectedDate: Date;
  minDate: Date;
  data: boolean[];

  constructor(private router: Router,
    public datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    public customerService: CustomerService,
    public outletService: OutletService, 
    public reservationService: ReservationService) {
      this.loginError = false;
      this.minDate = new Date();
     }

  ngOnInit(): void {
    
    this.outletService.retrieveAllOutlets().subscribe(
      response => {
        this.outlets = response.outlets;
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
    console.log(this.datePipe.transform(this.selectedDate, 'dd/MM/yyyy'));
    this.reservationService.retrieveReservationByDate(this.datePipe.transform(this.selectedDate, 'dd/MM/yyyy'), this.selectedOutlet).subscribe(
      response => {
        this.reservations = response.reservations;
        console.log(this.reservations);
      },
      error => {
        console.log(error);
      }
    );    
  }

}
