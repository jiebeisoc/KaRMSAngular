import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { FoodOrderTransactionLineItem } from './food-order-transaction-line-item';
import { FoodOrderTransaction } from './food-order-transaction';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { stringify } from 'querystring';


const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  baseUrl: string = '/api/FoodOrder';

  foodOrderTrancationLineItems: FoodOrderTransactionLineItem[];
  foodOrderTransactionToView: FoodOrderTransactionLineItem;
  totalLineItem: number = 0;
  totalQuantity: number = 0;
  totalAmount: number = 0;      


  constructor(private sessionService: SessionService,
    private httpClient: HttpClient,) {
    this.foodOrderTrancationLineItems = new Array();
     
  }


  setFoodOrderTransactionLineItems(foodOderTransactionLineItem: FoodOrderTransactionLineItem[]) {
    this.foodOrderTrancationLineItems = foodOderTransactionLineItem;
  }
  getFoodOrderTransactionLineItems() {
    return this.foodOrderTrancationLineItems;
  }

  createNewFoodOrderTransactionLineItem(newFoodOrderTransactionLineItem: FoodOrderTransactionLineItem){
   
    this.totalAmount+=newFoodOrderTransactionLineItem.subTotal;
    this.totalLineItem++;
    this.totalQuantity+=newFoodOrderTransactionLineItem.quantity;

    let foodOderTransactionLineItem: FoodOrderTransactionLineItem=new FoodOrderTransactionLineItem();
    foodOderTransactionLineItem.foodItem=newFoodOrderTransactionLineItem.foodItem;
    foodOderTransactionLineItem.quantity=newFoodOrderTransactionLineItem.quantity;
    foodOderTransactionLineItem.unitPrice=newFoodOrderTransactionLineItem.unitPrice;
    foodOderTransactionLineItem.subTotal=newFoodOrderTransactionLineItem.subTotal;
    this.foodOrderTrancationLineItems.push(foodOderTransactionLineItem);
  }

  editLineItem(lineItem:FoodOrderTransactionLineItem){
    this.totalQuantity = 0;
    this.totalAmount=0;
  
 
    for(var i: number = 0; i < this.foodOrderTrancationLineItems.length; i++)
    {
        this.totalQuantity=this.totalQuantity+this.foodOrderTrancationLineItems[i].quantity;
        this.totalAmount=this.totalAmount+this.foodOrderTrancationLineItems[i].subTotal;
    }

  
  }

  deleteLineItem(lineItem:FoodOrderTransactionLineItem){

    for(var i: number = 0; i < this.foodOrderTrancationLineItems.length; i++){
      if(this.foodOrderTrancationLineItems[i].foodItem.foodItemId==lineItem.foodItem.foodItemId){
        this.totalQuantity=this.totalQuantity-this.foodOrderTrancationLineItems[i].quantity;
        this.totalAmount=this.totalAmount-this.foodOrderTrancationLineItems[i].subTotal;
        this.totalLineItem--;
        this.foodOrderTrancationLineItems.splice(i,1);
      }
    }


  }

  clearCart(){
  this.foodOrderTrancationLineItems = new Array();
  this.totalLineItem = 0;
  this.totalQuantity = 0;
  this.totalAmount = 0;
  }

  checkOut(newTransaction:FoodOrderTransaction):Observable<any>{
    newTransaction.foodOrderTransactionLineItemEntities=this.foodOrderTrancationLineItems;
    newTransaction.totalAmount=this.totalAmount;
    newTransaction.totalLineItem=this.totalLineItem;
    newTransaction.totalQuantity = this.totalQuantity;
    newTransaction.customerEntity=this.sessionService.getCurrentCustomer();
    // newTransaction.transactionDateTime= new Date();
    
    let createTransactionReq={
      "customerId": this.sessionService.getCurrentCustomer().customerId,
      "username": this.sessionService.getCurrentCustomer().username,
       "password": this.sessionService.getPassword(),
       "newFoodOrderTransaction": newTransaction
    }


    alert("reach shopping cart service ") 
    alert("customerID"+createTransactionReq.customerId);
    console.log(JSON.stringify(createTransactionReq));
    return this.httpClient.put<any>(this.baseUrl + "/createFoodOrderTransaction", createTransactionReq, httpOptions).pipe (
      catchError(this.handleError)
  );
    

  
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    
    if (error.error instanceof ErrorEvent) {
        errorMessage = 'An unknown error has occurred: ' + error.error.message;
    } else {
        errorMessage = 'An HTTP has occurred: ' + `HTTP ${error.status}: ${error.error.message}`;
    }
    alert(throwError(errorMessage));
    return throwError(errorMessage)
  }
  

}

