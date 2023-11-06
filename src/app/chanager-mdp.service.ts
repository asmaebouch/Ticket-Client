import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChanagerMdpService {

  constructor(private http: HttpClient) {}
  PATH_OF_API="http://localhost:7011/api/Utilisateur/changepassword";
  changePassword(hero:any) {
    return this.http.post<any[]>(this.PATH_OF_API,hero)
    .pipe(
      catchError(this.handleError)
    );
  }private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
