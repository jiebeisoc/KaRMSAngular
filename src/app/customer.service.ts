import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { Customer } from './customer';
import { Song } from './song';

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

  retrieveFavouritePlaylist(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveFavouritePlaylist?customerId=" + this.sessionService.getCurrentCustomer().customerId).pipe(
      catchError(this.handleError)
    );
  }

  addSongToFavouritePlaylist(song: Song): Observable<any> {
    let updateFavouritePlaylistReq = {
      "song": song,
      "customerId": this.sessionService.getCurrentCustomer().customerId
      
    };

    return this.httpClient.post<any>(this.baseUrl + "/addSongToFavouritePlaylist", updateFavouritePlaylistReq, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteSongFromFavouritePlaylist(song: Song): Observable<any> {
    let updateFavouritePlaylistReq = {
      "song": song,
      "customerId": this.sessionService.getCurrentCustomer().customerId
      
    };

    return this.httpClient.post<any>(this.baseUrl + "/deleteSongFromFavouritePlaylist", updateFavouritePlaylistReq, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  addFavouritePlaylistToSongQueue(reservationId: number): Observable<any> {
    let favouritePlaylistSongQueueReq = {
      "customerId": this.sessionService.getCurrentCustomer().customerId,
      "reservationId": reservationId
    };

    return this.httpClient.post<any>(this.baseUrl + "/addFavouritePlaylistToSongQueue", favouritePlaylistSongQueueReq, httpOptions).pipe(
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

    return this.httpClient.post<any>(this.baseUrl + "/updateDetails", updateCustomerReq, httpOptions).pipe(
      catchError(this.handleError)
    );

  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    let changePasswordReq = {
      'username': this.sessionService.getUsername(),
      'password': this.sessionService.getPassword(),
      'oldPassword': oldPassword,
      'newPassword': newPassword
    };

    return this.httpClient.post<any>(this.baseUrl + "/changePassword", changePasswordReq, httpOptions).pipe(
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
        errorMessage = 'An HTTP error has occurred: ' + `HTTP ${error.status}: ${error.error.message}`;
    }
    return throwError(errorMessage)
  }
  
}
