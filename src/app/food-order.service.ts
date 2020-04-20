import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { FoodItem } from './food-item';


const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};




@Injectable({
  providedIn: 'root'
})
export class FoodOrderService {

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
