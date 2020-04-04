import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

import { SessionService } from '../../session.service';
import { CustomerService } from '../../customer.service';
import { Customer } from '../../customer';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  submitted: boolean;
  customerToUpdate: Customer;

  resultSuccess: boolean;
  resultError: boolean;
  message: string;

  nameFormControl = new FormControl('', [Validators.required]);
  contactNoFormControl = new FormControl('', [Validators.required, Validators.pattern("[0-9]{8}")]);
  dateFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router,
    public sessionService: SessionService,
    private customerService: CustomerService) {
      this.submitted = false;
      this.resultError = false;
      this.resultSuccess = false;
     }

  ngOnInit(): void {
    this.checkAccessRight();

    this.customerToUpdate = this.sessionService.getCurrentCustomer();
  }

  update(updateCustomerForm: NgForm) {
    if (updateCustomerForm.valid) {
      this.customerService.updateCustomer(this.customerToUpdate).subscribe(
        response => {
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "Details updated successfully";
        },
        error => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while updating details";

          console.log("******** UpdateCustomerComponent.ts: "  + error);
        }
      )
    }
  }

  checkAccessRight() {
		if(!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}

}
