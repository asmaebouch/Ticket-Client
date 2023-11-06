import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from './models/super-hero';

@Injectable({
  providedIn: 'root'
})
export class RoleserveService {






  constructor(private http:HttpClient) { }
  PATH_OF_API="http://localhost:7011/api";


  public getRole():Observable<Role[]>{
    return this.http.get<Role[]>(this.PATH_OF_API+"/Role");
  }
 
  public updateHero(heroId: number, newRoleName: string): Observable<Role[]> {
    const url = `${this.PATH_OF_API}/Role/${heroId}`;
    return this.http.put<Role[]>(url, JSON.stringify(newRoleName), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  public createHero(hero:Role){
    return this.http.post<Role[]>(this.PATH_OF_API+"/Role",hero);
  } 
  public deleteRole(id: number): Observable<Role[]> {
    return this.http.delete<Role[]>(`${this.PATH_OF_API}/Role/${id}`);
  }
}
