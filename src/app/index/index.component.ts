import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../session.service';
import { CustomerService } from '../customer.service';
import { OutletService } from '../outlet.service';

import { Customer } from '../customer';
import { NgForm } from '@angular/forms';
import { Outlet } from '../outlet';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  username: string;
  password: string;
  loginError: boolean;
  errorMessage: string;
  outlets: Outlet[];
  selectedOutlet: Outlet;
  selectedDate: Date;
  minDate: Date;
  data: boolean[];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    public customerService: CustomerService,
    public outletService: OutletService) {
      this.loginError = false;
      this.minDate = new Date();
     }

  ngOnInit(): void {
    this.outletService.retrieveAllOutlets().subscribe(
      response => {
        this.outlets = response.outlets;
      }
    )
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

}
