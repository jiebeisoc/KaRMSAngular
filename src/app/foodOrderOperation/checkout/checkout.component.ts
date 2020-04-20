import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { FoodOrderTransaction } from 'src/app/food-order-transaction';
import { OutletService } from 'src/app/outlet.service';
import { Outlet } from 'src/app/outlet';
import { SessionService } from 'src/app/session.service';
import { NgForm } from '@angular/forms';

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
    private sessionService: SessionService) { }

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
      alert("alert checkout component")
      this.shoppingCartService.checkOut(this.newTransaction).subscribe(
        response => {
          this.infoMessage="Transaction created successfully";
          this.shoppingCartService.clearCart();
        },
        error => {

          console.log('********** ERROR: ' + error);
        }
      );

    } else {
      alert("Payment failed, please try again!")
    }

  }



}
