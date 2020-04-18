import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baseUrl: string = '/api/Room';

  constructor(private httpClient: HttpClient) { }

  retrieveRoomByOutletAndRoomType(outletId: number, roomTypeId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl+"/retrieveRoomByOutletAndRoomType?outletId=" + outletId + "&roomTypeId=" + roomTypeId).pipe(
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
