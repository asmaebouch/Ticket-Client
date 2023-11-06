import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from './models/super-hero';

@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  constructor(private http:HttpClient) { }
  PATH_OF_API="http://localhost:7011/api/Affectation";

 

  

  public Recherche(etat: string): Observable<any[]> {
    // Construct the URL with a query parameter
    const params = new HttpParams().set('etat', etat);
    const url = `${this.PATH_OF_API}/recherche2`;

    return this.http.get<any[]>(url, { params });
  }
}
