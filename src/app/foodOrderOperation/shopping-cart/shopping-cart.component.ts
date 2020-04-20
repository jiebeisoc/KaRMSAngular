import { Component, OnInit } from '@angular/core';
import { FoodOrderTransactionLineItem } from 'src/app/food-order-transaction-line-item';
import { Customer } from 'src/app/customer';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/session.service';
import { FoodOrderService } from 'src/app/food-order.service';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  submitted: boolean;
  transactionLineItems: FoodOrderTransactionLineItem[];
  lineItemToView: FoodOrderTransactionLineItem;
  display: boolean;
  totalLineItem: number;
  totalQuantity: number;
  totalAmt:number;
  customer: Customer;
  quantity: number;
  infoMessage: string;

  constructor(private router: Router,
              public sessionService: SessionService,
              private foodOrderService: FoodOrderService,
              private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.checkAccessRight();
    this.submitted = false;
    this.infoMessage = null;
    this.totalLineItem = this.shoppingCartService.totalLineItem;
    this.totalAmt = this.shoppingCartService.totalAmount;
    this.totalQuantity = this.shoppingCartService.totalQuantity;
    this.customer = this.sessionService.getCurrentCustomer();
    this.transactionLineItems = this.shoppingCartService.foodOrderTrancationLineItems;
    alert(JSON.stringify(this.transactionLineItems));

  }

  showDialog(lineItemToView: FoodOrderTransactionLineItem) {
    this.display = true;
    this.lineItemToView = lineItemToView;
    this.quantity = lineItemToView.quantity;
  }

  edit(addToCartForm: NgForm) {
    this.checkAccessRight();
    this.display=false;
    this.lineItemToView.subTotal = this.lineItemToView.quantity*this.lineItemToView.unitPrice;
    this.shoppingCartService.editLineItem(this.lineItemToView);
    this.transactionLineItems = this.shoppingCartService.getFoodOrderTransactionLineItems();
    this.totalAmt = this.shoppingCartService.totalAmount;
    this.totalQuantity = this.shoppingCartService.totalQuantity;

  }



  checkAccessRight()
	{
		if(!this.sessionService.checkAccessRight(this.router.url))
		{
			this.router.navigate(["/accessRightError"]);
		}
  }
 

  
}
