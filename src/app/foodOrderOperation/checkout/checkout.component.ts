import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { FoodOrderTransaction } from 'src/app/food-order-transaction';
import { OutletService } from 'src/app/outlet.service';
import { Outlet } from 'src/app/outlet';
import { SessionService } from 'src/app/session.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalAmt: number;
  newTransaction: FoodOrderTransaction = new FoodOrderTransaction();
  outletList: Outlet[];
  selectedCreditCardNo: string;
  submitted: boolean;
  selectedOutletId: number;
  infoMessage:string;

  constructor(private shoppingCartService: ShoppingCartService,
    private outletService: OutletService,
    private sessionService: SessionService,
    private dialog:MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.totalAmt = this.shoppingCartService.totalAmount;

    this.outletService.retrieveAllOutlets().subscribe(
      response => {
        this.outletList = response.outlets;
      },
      error => {
        console.log('************************ RetrieveAllOutlets.ts: ' + error)
      }
    );
    this.selectedCreditCardNo = this.sessionService.getCurrentCustomer().creditCardNo;
    this.submitted = false;

  }

  checkOut(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.newTransaction.creditCardNo = this.selectedCreditCardNo;
      let selectedOutlet: Outlet = new Outlet();
      this.newTransaction.outlet = selectedOutlet;
      this.newTransaction.outlet.outletId = this.selectedOutletId;
      this.shoppingCartService.checkOut(this.newTransaction).subscribe(
        response => {

          this.dialog.open("Transaction created successfully!", '', {
            duration: 5000,
            panelClass: ['snackbar']
          });    
          this.shoppingCartService.clearCart();
          this.router.navigate(["/foodOrderOperation/viewPastFoodOrders"]);
        },
        error => {
          this.dialog.open(error, '', {
            duration: 5000,
            panelClass: ['snackbar']
          });    
        }
      );

    } else {
      this.dialog.open("Invalid input, please try again!", '', {
        duration: 5000,
        panelClass: ['snackbar']
      });    
     
    }

  }



}
