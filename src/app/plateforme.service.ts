import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plateforme, Role } from './models/super-hero';

@Injectable({
  providedIn: 'root'
})
export class PLateformeService {



  constructor(private http:HttpClient) { }
  PATH_OF_API="http://localhost:7011/api/Plateform";


  public getRole():Observable<Plateforme[]>{
    return this.http.get<Plateforme[]>(this.PATH_OF_API);
  }
 
  public updateHero(heroId: number, client: Plateforme): Observable<Plateforme[]> {
    const url = `${this.PATH_OF_API}/${heroId}`;
    return this.http.put<Plateforme[]>(url, JSON.stringify(client), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  public createHero(hero:Plateforme){
    return this.http.post<Plateforme[]>(this.PATH_OF_API,hero);
  } 
  public deleteRole(id: number): Observable<Plateforme[]> {
    return this.http.delete<Plateforme[]>(`${this.PATH_OF_API}/${id}`);
  }
}
