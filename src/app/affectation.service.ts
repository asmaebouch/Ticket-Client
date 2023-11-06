import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Affectation, Ticket2, Utilisateur } from './models/super-hero';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private http:HttpClient) { }
  PATH_OF_API="http://localhost:7011/api/";

  public getTicket(){
    return this.http.get<Affectation[]>(this.PATH_OF_API+"Affectation");
  }
  public updateHero(heroId: number, client: Affectation): Observable<Affectation[]> {
    const url = `${this.PATH_OF_API}Affectation/${heroId}`;
    return this.http.put<Affectation[]>(url, JSON.stringify(client), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  public createTicket(hero:any){
    return this.http.post(this.PATH_OF_API+"Affectation",hero);
  } 
  
  public deleteTicket(id: number) {
    return this.http.delete<Affectation[]>(`${this.PATH_OF_API}Affectation/${id}`);
  }
}
