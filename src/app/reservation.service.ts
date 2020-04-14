import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Outlet } from './outlet';
import { RoomType } from './room-type';
import { Room } from './room';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  baseUrl: string = '/api/Reservation';

  constructor(private httpClient: HttpClient) { }

  retrieveReservationByDate(date: string, outlet: Outlet, roomType: RoomType): Observable<any> {

    return this.httpClient.get<any>(this.baseUrl+"/retrieveReservationByDate?date=" + date + "&outletId=" + outlet.outletId + "&roomTypeName=" + roomType.roomTypeId).pipe(
      catchError(this.handleError)
    );
  }

  retrieveReservationByRoomAndDate(date: string, room: Room): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl+'/retrieveReservationByRoomAndDate?date=' + date + "&roomId=" + room.roomId).pipe(
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
