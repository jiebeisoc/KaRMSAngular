import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { Reservation } from './reservation';
import { Song } from './song';
import { Customer } from './customer';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SongService {

  baseUrl: string = '/api/Song';

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  viewAllSongs(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/viewAllSongs").pipe(
      catchError(this.handleError)
    );
  }

  viewSongByCategory(songCategoryId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/viewSongByCategory?songCategoryId=" + songCategoryId).pipe(
      catchError(this.handleError)
    );
  }

  viewFavouritePlaylistByCategory(songCategoryId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/viewFavouritePlaylistByCategory?customerId=" + this.sessionService.getCurrentCustomer().customerId + "&songCategoryId=" + songCategoryId).pipe(
      catchError(this.handleError)
    );
  }

  viewSongQueueByCategory(reservationId: number, songCategoryId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/viewSongQueueByCategory?reservationId=" + reservationId + "&songCategoryId=" + songCategoryId).pipe(
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
