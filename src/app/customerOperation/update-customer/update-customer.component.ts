import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SessionService } from '../../session.service';
import { CustomerService } from '../../customer.service';
import { Customer } from '../../customer';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})

export class UpdateCustomerComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  submitted: boolean;
  customerToUpdate: Customer = new Customer();

  resultSuccess: boolean;
  resultError: boolean;
  retrieveCustomerError: boolean;
  detailsMessage: string;
  passwordMessage: string;
  deleteAccountMessage: string;

  oldPassword: string;
  newPassword: string;
  notSame: boolean;

  deleteAccountPassword: string;

  passwordForm: FormGroup;
  passwordFormControl = new FormControl('', [Validators.required]);


  constructor(private router: Router,
    public sessionService: SessionService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private updateDialog: MatSnackBar,
    private passwordDialog: MatSnackBar,
    private deleteDialog: MatSnackBar) {
      this.submitted = false;
      this.resultError = false;
      this.resultSuccess = false;
      this.retrieveCustomerError = false;
      this.notSame = false;
      this.passwordForm = this.formBuilder.group({
        password: ['', [Validators.required]],
        confirmPassword: ['']
        }, { validator: this.checkPasswords });
     }

  ngOnInit(): void {
    this.checkAccessRight();

    this.customerService.customerLogin(this.sessionService.getUsername(), this.sessionService.getPassword()).subscribe(
      response => {
        this.customerToUpdate = response.customer;
      },
      error => {
        this.retrieveCustomerError = true;
      }
    )
  }

  update(updateCustomerForm: NgForm) {
    if (updateCustomerForm.valid) {
      this.customerService.updateCustomer(this.customerToUpdate).subscribe(
        response => {
          this.resultSuccess = true;
          this.resultError = false;
          this.detailsMessage = "Details updated successfully";  
          this.updateDialog.open(this.detailsMessage, '', {
            duration: 5000,
            panelClass: ['snackbar']
          });        
        },
        error => {
          this.resultError = true;
          this.resultSuccess = false;
          this.detailsMessage = "An error has occurred while updating details";
          this.updateDialog.open(this.detailsMessage, '', {
            duration: 5000,
            panelClass: ['snackbar']
          });
          console.log("******** UpdateCustomerComponent.ts: "  + error);
        }
      )
      
    }
  }

  changePassword() {
    this.customerService.changePassword(this.oldPassword, this.newPassword).subscribe(
      response => {
        this.resultSuccess = true;
        this.resultError = false;
        this.passwordMessage = "Password changed successfully";
        this.passwordDialog.open(this.passwordMessage, '', {
          duration: 5000,
          panelClass: ['snackbar']
        });
      },
      error => {
        this.resultError = true;
        this.resultSuccess = false;
        this.passwordMessage = "An error has occurred while changing password";
        this.passwordDialog.open(this.passwordMessage, '', {
          duration: 5000,
          panelClass: ['snackbar']
        });
        console.log("******** UpdateCustomerComponent.ts: "  + error);
      }
    )
    
  }

  deleteAccount() {
    if (this.sessionService.getPassword() === this.deleteAccountPassword) {
      this.customerService.deleteCustomer(this.sessionService.getCurrentCustomer().customerId).subscribe(
        response => {
          this.customerLogout();
          this.deleteDialog.open('Account deleted successfully', '', {
            duration: 5000,
            panelClass: ['snackbar']
          });
        },
        error => {
          this.resultError = true;
          this.resultSuccess = false;
          this.deleteAccountMessage = "An error has occurred while deleting account";
          this.deleteDialog.open(this.deleteAccountMessage, '', {
            duration: 5000,
            panelClass: ['snackbar']
          });
          console.log("******** UpdateCustomerComponent.ts: "  + error);
        }
      )
    } else {
      this.deleteAccountMessage = "Password is incorrect"
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.deleteAccount();
        }
      }
    );
  }

  customerLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentCustomer(null);
    this.sessionService.setUsername(null);
    this.sessionService.setPassword(null);

    this.router.navigate(["/index"]);
  }

  checkPasswords(group: FormGroup) {
    let password = group.get('password').value;
    let confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true }
  }

  checkAccessRight() {
		if(!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}

}

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
