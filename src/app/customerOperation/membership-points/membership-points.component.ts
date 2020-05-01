import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Customer } from '../../customer';
import { SessionService } from '../../session.service';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-membership-points',
  templateUrl: './membership-points.component.html',
  styleUrls: ['./membership-points.component.css']
})
export class MembershipPointsComponent implements OnInit {

  currentCustomer: Customer;
  retrieveCustomerError: boolean;

  constructor(public sessionService: SessionService,
    private customerService: CustomerService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkAccessRight();

    this.customerService.customerLogin(this.sessionService.getUsername(), this.sessionService.getPassword()).subscribe(
      response => {
        this.currentCustomer = response.customer;
      },
      error => {
        this.retrieveCustomerError = true;
      }
    )
  }

  checkAccessRight() {
		if(!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}

}
