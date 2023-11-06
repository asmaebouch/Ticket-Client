import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket2, Utilisateur } from './models/super-hero';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

 //private url="Client";
  constructor(private http:HttpClient) { }
  PATH_OF_API="http://localhost:7011/api/";
  
  public getTicket(id:number){
    return this.http.get<Ticket2[]>(this.PATH_OF_API+"TicketFinal/user/"+id);
  }
  public getTicket2(){
    return this.http.get<Ticket2[]>(this.PATH_OF_API+"TicketFinal/AllTicket");
  }
  /*public updateHero(heroId: number, client: Ticket2): Observable<Ticket2[]> {
    const url = `${this.PATH_OF_API}TicketFinal/${heroId}`;
    return this.http.put<Ticket2[]>(url, JSON.stringify(client), {
      headers: { 'Content-Type': 'application/json' }
    });
  }*/
  updateHero(heroId: number, ticket: any): Observable<Ticket2[]> {
    // Convert specific properties to integers
    ticket.solverUserId = parseInt(ticket.solverUserId);
    ticket.qualificationId=parseInt(ticket.qualificationId);
    ticket.utilisateurId=parseInt(ticket.utilisateurId);
    ticket.plateformeId=parseInt(ticket.plateformeId);
    ticket.serviceId=parseInt(ticket.serviceId);
    // Add similar conversions for other integer properties (e.g., plateformeId, qualificationId)

    return this.http.put<any>(`${this.PATH_OF_API}TicketFinal/${heroId}`, ticket);
  }

 
  public createTicket(ticket: Ticket2) {
    console.log("bkbk");
    console.log("ticket",ticket)
  return  this.http.post(this.PATH_OF_API+"TicketFinal",ticket);
  }
 
  
  
  public deleteTicket(id: number) {
    return this.http.delete<Ticket2[]>(`${this.PATH_OF_API}Ticket2/${id}`);
  }
}
