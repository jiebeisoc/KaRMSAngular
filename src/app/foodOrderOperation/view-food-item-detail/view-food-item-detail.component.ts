import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/food-item';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/session.service';
import { FoodOrderService } from 'src/app/food-order.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { NgForm } from '@angular/forms';
import { FoodOrderTransactionLineItem } from 'src/app/food-order-transaction-line-item';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-food-item-detail',
  templateUrl: './view-food-item-detail.component.html',
  styleUrls: ['./view-food-item-detail.component.css']
})
export class ViewFoodItemDetailComponent implements OnInit {

  foodItemId: number;
  quantity: number;
  foodItemToView:FoodItem;
  retrieveFoodItemError: boolean;

  
  
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    public foodOrderService:FoodOrderService,
    public shoppingCartService: ShoppingCartService,
    private dialog: MatSnackBar
  ) {
    this.retrieveFoodItemError= false;
    this.quantity=0;
  }

  ngOnInit(): void {

    this.foodItemId = parseInt(this.activatedRoute.snapshot.paramMap.get('foodItemId'));
  
    this.foodOrderService.getFoodItemById(this.foodItemId).subscribe(
      response => {
        this.foodItemToView=response.foodItem;
      },
      error=> {
        this.retrieveFoodItemError = true;
      }
    )
  }

  addToCart(addToCartForm: NgForm){
    this.checkAccessRight();
    this.shoppingCartService.createNewFoodOrderTransactionLineItem(new FoodOrderTransactionLineItem(this.foodItemToView,this.quantity,this.foodItemToView.unitPrice));
    this.dialog.open("Added to Cart!", '', {
      duration: 5000,
      panelClass: ['snackbar']
    });     
  }

  checkAccessRight()
	{
		if(!this.sessionService.checkAccessRight(this.router.url))
		{
			this.router.navigate(["/accessRightError"]);
		}else{
      return true;
    }
  }
  

}
