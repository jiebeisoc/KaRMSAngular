import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { Customer } from './customer';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl: string = '/api/Customer';

  constructor(private httpClient: HttpClient,
              private sessionService: SessionService) { }

  customerLogin(username: string, password: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/customerLogin?username=" + username + "&password=" + password).pipe(
      catchError(this.handleError)
    );
  }

  createNewCustomer(newCustomer: Customer): Observable<any> {
    let createCustomerReq = {'newCustomer': newCustomer};
    
    return this.httpClient.put<any>(this.baseUrl + "/createNewCustomer", createCustomerReq, httpOptions).pipe (
        catchError(this.handleError)
    );
  }

  updateCustomer(customerToUpdate: Customer): Observable<any> {
    let updateCustomerReq = {
      'username': this.sessionService.getUsername(),
      'password': this.sessionService.getPassword(),
      'customer': customerToUpdate
    };

    return this.httpClient.post<any>(this.baseUrl, updateCustomerReq, httpOptions).pipe(
      catchError(this.handleError)
    );

  }

  deleteCustomer(customerId: number) {
    return this.httpClient.delete<any>(this.baseUrl +"/" + customerId + "?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
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
    return throwError(errorMessage)
}
  
}
