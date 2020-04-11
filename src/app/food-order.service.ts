import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';


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


    
}
