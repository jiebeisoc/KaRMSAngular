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
export class PromotionService {

  baseUrl: string = '/api/Promotion';

  constructor(private httpClient: HttpClient) { }

  retrievePromotions(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  retrievePromotionsByTime(time: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl+"/retrievePromotionsByTime?time=" + time).pipe(
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
