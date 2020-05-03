import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { FoodItem } from './food-item';
import { FoodOrderTransaction } from './food-order-transaction';


const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};




@Injectable({
  providedIn: 'root'
})
export class FoodOrderService {

  
  selectedTransaction:FoodOrderTransaction;

  baseUrl: string = "/api/FoodOrder"

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService ) 
    { 

    }

    getFoodItems(): Observable<any>
    {
      return this.httpClient.get<any>(this.baseUrl+"/retrieveAllFoodItems");
    }

    getFoodItemById(foodItemId: number): Observable<any>{
   
      return this.httpClient.get<any>(this.baseUrl+"/retrieveFoodItem/"+foodItemId).pipe(
        catchError(this.handleError)
      );
    }

    getPastFoodOrderTransactions(){
      let customerId:number=this.sessionService.getCurrentCustomer().customerId;
      return this.httpClient.get<any>(this.baseUrl+"/retrieveAllPastFoodOrders/"+customerId).pipe(
        catchError(this.handleError)
      );
    }




  

    setSelectedTransaction(transaction:FoodOrderTransaction){
      
      this.selectedTransaction=transaction;

    }

     cancelTransaction(foodOrderTransactionId:number){
      return this.httpClient.delete<any>(this.baseUrl+"/cancelFoodOrderTransaction/"+foodOrderTransactionId).pipe(
        catchError(this.handleError)
      );
     }

     private handleError(error: HttpErrorResponse) {
      let errorMessage: string = "";
      
      if (error.error instanceof ErrorEvent) {		
        errorMessage = "An unknown error has occurred: " + error.error.message;
      } else {		
        errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`;
      }
      
      alert(errorMessage);
      return throwError(errorMessage);		
    }




    
}
