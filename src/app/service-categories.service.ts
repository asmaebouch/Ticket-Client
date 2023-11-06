import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plateforme, ServiceCateg } from './models/super-hero';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoriesService {

  

  constructor(private http:HttpClient) { }
  PATH_OF_API="http://localhost:7011/api/Service";


  public getRole():Observable<ServiceCateg[]>{
    return this.http.get<ServiceCateg[]>(this.PATH_OF_API);
  }
 
  public updateHero(heroId: number, client: ServiceCateg): Observable<ServiceCateg[]> {
    const url = `${this.PATH_OF_API}/${heroId}`;
    return this.http.put<ServiceCateg[]>(url, JSON.stringify(client), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  public createHero(hero:ServiceCateg){
    return this.http.post<ServiceCateg[]>(this.PATH_OF_API,hero);
  } 
  public deleteRole(id: number): Observable<ServiceCateg[]> {
    return this.http.delete<ServiceCateg[]>(`${this.PATH_OF_API}/${id}`);
  }
}
