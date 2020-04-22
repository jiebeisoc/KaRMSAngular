import { Component, OnInit } from '@angular/core';
import { FoodOrderService } from 'src/app/food-order.service';
import { FoodOrderTransaction } from 'src/app/food-order-transaction';

@Component({
  selector: 'app-view-transaction-details',
  templateUrl: './view-transaction-details.component.html',
  styleUrls: ['./view-transaction-details.component.css']
})
export class ViewTransactionDetailsComponent implements OnInit {
  selectedTransaction:FoodOrderTransaction;
  infoMessage:string;

  
 
  constructor(private foodOrderService: FoodOrderService,                                 
    ) { }

  ngOnInit(): void {

    this.selectedTransaction=this.foodOrderService.selectedTransaction;

  }

}
