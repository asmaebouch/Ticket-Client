import { Injectable } from '@angular/core';
import { SuperHero } from '../models/super-hero';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroService {
private url="Client";





  constructor(private http:HttpClient) { }
  PATH_OF_API="http://localhost:7011/api";

  public getSupperHeroes():Observable<SuperHero[]>{
    return this.http.get<SuperHero[]>(this.PATH_OF_API+"/Client");
  }

  public updateHero(heroId: number, client: SuperHero): Observable<SuperHero[]> {
    const url = `${this.PATH_OF_API}/Client/${heroId}`;
    return this.http.put<SuperHero[]>(url, JSON.stringify(client), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  public createHero(hero:SuperHero):Observable<SuperHero[]>{
    return this.http.post<SuperHero[]>(this.PATH_OF_API+"/Client",hero);
  } 
  public deleteHero(id: number): Observable<SuperHero[]> {
    return this.http.delete<SuperHero[]>(`${this.PATH_OF_API}/Client/${id}`);
  }
  
}
