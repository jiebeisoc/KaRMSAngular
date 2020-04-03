import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm, FormControl, Validators } from '@angular/forms';

import { Customer } from '../../customer';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {

  submitted: boolean;
  newCustomer: Customer;
  infoMessage: string;
  errorMessage: string;
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  contactNoFormControl = new FormControl('', [Validators.required]);
  creditCardNoFormControl = new FormControl('', [Validators.required]);
  dateFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router,
    private customerService: CustomerService) { 
      this.submitted = false;
      this.newCustomer = new Customer();
    }

  ngOnInit(): void {
  }

  clear() {
    this.submitted = false;
    this.newCustomer = new Customer();
  }

  create(createCustomerForm: NgForm) {
    this.submitted = true;
    this.newCustomer.birthday = new Date(this.newCustomer.birthday);
    console.log(this.newCustomer.birthday);
    if (createCustomerForm.valid) {
        this.customerService.createNewCustomer(this.newCustomer).subscribe(
            response => {
                this.infoMessage = 'Customer registered successfully.';
                this.errorMessage = null;
            },
            error => {
                this.infoMessage = null;
                this.errorMessage = error;
            }
        );
    }
}

}
