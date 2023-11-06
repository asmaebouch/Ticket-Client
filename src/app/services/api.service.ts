import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL: string = "http://localhost:7011/api/Utilisateur";

  constructor(private http:HttpClient) { }
  getUsers(){
    return this.http.get<any>(this.baseURL);
  }
}
