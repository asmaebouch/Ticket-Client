import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role, Utilisateur } from './models/super-hero';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurserveService {

  private url="Client";
  constructor(private http:HttpClient) { }
  PATH_OF_API="http://localhost:7011/api/Utilisateur/";

  public getRole(){
    return this.http.get<Utilisateur[]>(this.PATH_OF_API);
  }

  public updateHero(heroId: number, client: Utilisateur): Observable<Utilisateur[]> {
    const url = `${this.PATH_OF_API}/Utilisateur
    /${heroId}`;
    return this.http.put<Utilisateur[]>(url, JSON.stringify(client), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  public signUp(hero: any, selectedRoleName: string) {
    const params = new HttpParams().set('selectedRoleName', selectedRoleName);
    return this.http.post(this.PATH_OF_API + "register", hero, { params });
  }
  
  public login(hero:any){
    return this.http.post(this.PATH_OF_API+"/authenticate",hero);
  } 
  public deleteRole(id: number) {
    return this.http.delete<Utilisateur[]>(`${this.PATH_OF_API}${id}`);
  }
}
