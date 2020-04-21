import { Component, OnInit } from '@angular/core';
import { FoodOrderService } from 'src/app/food-order.service';
import { FoodOrderTransaction } from 'src/app/food-order-transaction';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-past-food-orders',
  templateUrl: './view-past-food-orders.component.html',
  styleUrls: ['./view-past-food-orders.component.css']
})
export class ViewPastFoodOrdersComponent implements OnInit {


  pastFoodOrerList:FoodOrderTransaction[]=new Array();
  infoMessage:string;
  errorMessage:string;
  constructor(private foodOrderService:FoodOrderService,
      private router:Router,
      ) { }



  ngOnInit(): void {

    this.foodOrderService.getPastFoodOrderTransactions().subscribe(
      response => {
        this.pastFoodOrerList=response.foodOrderTransactionList  
      },
      error => {
        alert("Error occurred while retrieving the past food order");
      }
    );
  }

  viewTransactionDetails(transaction: FoodOrderTransaction){
    alert(JSON.stringify(transaction));
    this.foodOrderService.setSelectedTransaction(transaction);
    this.router.navigate(['/foodOrderOperation/viewTransactionDetails']);
  }

  cancelTransaction(foodOrder:FoodOrderTransaction){
    alert("Reach cancelTransaction in view past food order component");
    this.foodOrderService.cancelTransaction(foodOrder.foodOrderTransactionId).subscribe(
      response => {
        this.infoMessage=response.message;
      },
      error => {
        this.errorMessage = error;
      }
    );

  }






}
