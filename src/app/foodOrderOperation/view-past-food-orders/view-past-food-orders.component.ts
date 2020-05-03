import { Component, OnInit } from '@angular/core';
import { FoodOrderService } from 'src/app/food-order.service';
import { FoodOrderTransaction } from 'src/app/food-order-transaction';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-view-past-food-orders',
  templateUrl: './view-past-food-orders.component.html',
  styleUrls: ['./view-past-food-orders.component.css']
})
export class ViewPastFoodOrdersComponent implements OnInit {


  pastFoodOrerList: FoodOrderTransaction[] = new Array();
  infoMessage: string;
  errorMessage: string;
  constructor(private foodOrderService: FoodOrderService,
    private router: Router,
    private dialog: MatSnackBar
  ) { }



  ngOnInit(): void {

    this.foodOrderService.getPastFoodOrderTransactions().subscribe(
      response => {
        this.pastFoodOrerList = response.foodOrderTransactionList
      },
      error => {
        alert("Error occurred while retrieving the past food order");
      }
    );
  }

  viewTransactionDetails(transaction: FoodOrderTransaction) {

    this.foodOrderService.setSelectedTransaction(transaction);
    this.router.navigate(['/foodOrderOperation/viewTransactionDetails']);
  }

  cancelTransaction(foodOrder: FoodOrderTransaction) {

    this.foodOrderService.cancelTransaction(foodOrder.foodOrderTransactionId).subscribe(
      response => {
        this.foodOrderService.getPastFoodOrderTransactions().subscribe(
          response => {
            this.pastFoodOrerList = response.foodOrderTransactionList
          },
          error => {
            alert("Error occurred while retrieving the past food order");
          }
        );
       
        this.infoMessage = response.message;
        this.dialog.open("Transaction Cancelled Successfully", '', {
          duration: 5000,
          panelClass: ['snackbar']
        });
  
      },
      error => {
        this.errorMessage = error;
      }
    );

  }






}
