import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModeel } from '../models/token-api.models';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL: string = "http://localhost:7011/api/Utilisateur/";
  private userPaylod:any;
  // Define the HttpHeaders for your requests
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,private router:Router) { 
    this.userPaylod=this.decodeToken();
  }
  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseURL}registre`, userObj);
  }
  getUserIdFromToken(): string | null {
    const decodedToken = this.decodeToken(); // Vous pouvez utiliser la méthode que vous avez déjà implémentée pour décoder le token
    if (decodedToken) {
      return decodedToken.UserId;
    }
    return null; // Ou une valeur par défaut si l'ID n'est pas présent
  }
  
  login(loginObj: any) {
    return this.http.post<any>(`${this.baseURL}authenticate`, loginObj, this.httpOptions);
  }
  signOut(){
    localStorage.clear();
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
     }
     storeRefreshToken(tokenValue:string){
      localStorage.setItem('refreshToken',tokenValue)
       }
     getToken()
{
  return localStorage.getItem('token')
}
getRefreshToken()
{
  return localStorage.getItem('refreshToken')
}
isLoggedIn():boolean{
return !!localStorage.getItem('token')
}
decodeToken()
{
  const jwtHelper=new JwtHelperService();
  const token = this.getToken()!;
  console.log(jwtHelper.decodeToken(token))
  console.log('Decoded Token:', jwtHelper.decodeToken(token));

  return jwtHelper.decodeToken(token)
}
getfullNameFromToken(){
if(this.userPaylod){
  return this.userPaylod.unique_name;
}
}

getgiven_nameFromToken(){
  if(this.userPaylod){
    return this.userPaylod.given_name;
  }
  }
  getfamily_nameFromToken(){
    if(this.userPaylod){
      return this.userPaylod.family_name;
    }
    }
getfullEmailFromToken(){
  if(this.userPaylod){
    return this.userPaylod.email;
  }
  }
getRoleFromToken(){
if(this.userPaylod){
  return this.userPaylod.role;
}
}
public isLoggedin(){
  return this.getRoleFromToken() && this.getToken();
}
renewToken(tokenApi : TokenApiModeel){
return this.http.post<any>(`${this.baseURL}refresh`,tokenApi);
}


}
