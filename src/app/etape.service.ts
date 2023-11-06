import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etape, Qualification } from './models/super-hero';

@Injectable({
  providedIn: 'root'
})
export class EtapeService {

  constructor(private http:HttpClient) { }
  PATH_OF_API="http://localhost:7011/api/Etape";


  public getRole():Observable<Etape[]>{
    return this.http.get<Etape[]>(this.PATH_OF_API);
  }
 
  public updateHero(heroId: number, client: Etape): Observable<Etape[]> {
    const url = `${this.PATH_OF_API}/${heroId}`;
    return this.http.put<Etape[]>(url, JSON.stringify(client), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  public createHero(hero:Etape){
    return this.http.post<Etape[]>(this.PATH_OF_API,hero);
  } 
  public deleteRole(id: number): Observable<Etape[]> {
    return this.http.delete<Etape[]>(`${this.PATH_OF_API}/${id}`);
  }
}
