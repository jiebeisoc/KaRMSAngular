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

  totalAmt:number;
  newTransaction:FoodOrderTransaction = new FoodOrderTransaction();
  outletList:Outlet[];
  creditCartNo:string;
  submitted:boolean;

  constructor( private shoppingCartService: ShoppingCartService,
               private outletService: OutletService,
               private sessionService:SessionService) { }

  ngOnInit(): void {
    this.totalAmt=this.shoppingCartService.totalAmount;

    this.outletService.retrieveAllOutlets().subscribe(
      response => {
        this.outletList = response.foodItemEntities;
      },
      error => {
        console.log('************************ RetrieveAllOutlets.ts: '+error )
      }
    );
    this.creditCartNo=this.sessionService.getCurrentCustomer().creditCardNo;
    this.submitted = false;

  }

  checkOut(form:NgForm){
    this.submitted = true;
    if(form.valid){
      this.newTransaction.creditCardNo=this.creditCartNo;
    this.shoppingCartService.checkOut(this.newTransaction);
    }else{
      alert("Payment failed, please try again!")
    }
    
  }

 

}
