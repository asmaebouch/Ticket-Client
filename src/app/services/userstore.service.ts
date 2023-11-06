import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserstoreService {
private unique_name=new BehaviorSubject<string>("");
private role$=new BehaviorSubject<string>("");
private email$=new BehaviorSubject<string>("");
private family_name$=new BehaviorSubject<string>("");
private given_name$=new BehaviorSubject<string>("");
private UserId$=new BehaviorSubject<string>("")
  constructor() { }
public getRoleFromStrore(){
  return this.role$.asObservable();
}
public getEmailFromStrore(){
  return this.email$.asObservable();
}
public setRoleForStore(role:string){
  this.role$.next(role);
}
public getfamily_nameFromStore(): Observable<any> {
  return this.family_name$.asObservable();
}
public getgiven_nameFromStore(): Observable<any> {
  return this.given_name$.asObservable();
}
public getFullNameeFromStore(): Observable<any> {
  return this.unique_name.asObservable();
}
public setFullNameForStore(unique_name:string){
  this.unique_name.next(unique_name); 
}

getUserIdFromToken(): Observable<any> {
  return this.UserId$.asObservable();

}
}
