import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Outlet } from './outlet';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  baseUrl: string = '/api/Reservation';

  constructor(private httpClient: HttpClient) { }

  retrieveReservationByDate(date: string, outlet: Outlet): Observable<any> {

    return this.httpClient.get<any>(this.baseUrl+"/retrieveReservationByDate?date=" + date + "&outletId=" + outlet.outletId).pipe(
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
