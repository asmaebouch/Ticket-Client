import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordServiceService {
private baseUrl:string ="http://localhost:7011/api/Utilisateur/"
  constructor(private http:HttpClient) { }
  sendRestPasswordLink(email:string){
    return this.http.post<any>(`${this.baseUrl}send-rest-email/${email}`,{})
  }
  resetPassword(resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.baseUrl}reset-password`,resetPasswordObj);
  }
}
