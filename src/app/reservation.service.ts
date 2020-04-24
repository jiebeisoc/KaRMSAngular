import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Outlet } from './outlet';
import { RoomType } from './room-type';
import { Room } from './room';
import { SessionService } from './session.service';
import { Reservation } from './reservation';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  baseUrl: string = '/api/Reservation';

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

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

  retrieveUpcomingReservationByCustomer(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl+'/retrieveUpcomingReservationByCustomer?username=' + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    );
  }

  retrievePastReservationByCustomer(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl+'/retrievePastReservationByCustomer?username=' + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    );
  }

  getReservation(reservationId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveReservation/" + reservationId + "&username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    );
  }

  calculateTotalPrice(time: number, duration: number, roomTypeId: number, promotionId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl+"/calculateTotalPrice?time=" + time + "&duration=" + duration + "&roomTypeId=" + roomTypeId + "&promotionId=" + promotionId).pipe(
      catchError(this.handleError)
    );
  }

  createNewReservation(newReservation: Reservation, roomId: number, outletId: number, promotionId: number, pointsRedeemed: number, status: string): Observable<any> {
    let createReservationReq = {
      "username": this.sessionService.getUsername(),
      "password": this.sessionService.getPassword(),
      "roomId": roomId,
      "outletId": outletId,
      "promotionId": promotionId,
      "pointsRedeemed": pointsRedeemed,
      "status": status,
      "newReservation": newReservation
    };

    return this.httpClient.put<any>(this.baseUrl, createReservationReq, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateReservation(reservationToUpdate: Reservation, roomId: number, outletId: number, promotionId: number): Observable<any> {
    let updateReservationReq = {
      "username": this.sessionService.getUsername(),
      "password": this.sessionService.getPassword(),
      "roomId": roomId,
      "outletId": outletId,
      "promotionId": promotionId,
      "reservation": reservationToUpdate
    };

    return this.httpClient.post<any>(this.baseUrl, updateReservationReq, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteReservation(reservationId: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/" + reservationId + "?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe(
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
