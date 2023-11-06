import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plateforme, Qualification } from './models/super-hero';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  constructor(private http:HttpClient) { }
  PATH_OF_API="http://localhost:7011/api/Qualification";


  public getRole():Observable<Qualification[]>{
    return this.http.get<Qualification[]>(this.PATH_OF_API);
  }
 
  public updateHero(heroId: number, client: Qualification): Observable<Qualification[]> {
    const url = `${this.PATH_OF_API}/${heroId}`;
    return this.http.put<Qualification[]>(url, JSON.stringify(client), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  public createHero(hero:Qualification){
    return this.http.post<Qualification[]>(this.PATH_OF_API,hero);
  } 
  public deleteRole(id: number): Observable<Qualification[]> {
    return this.http.delete<Qualification[]>(`${this.PATH_OF_API}/${id}`);
  }
}
