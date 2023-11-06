import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserstoreService } from '../services/userstore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  
public unique_name:string="";
  public role:string="";
constructor(private auth:AuthService,private userStore:UserstoreService){}
  
ngOnInit() {
 
this.userStore.getFullNameeFromStore()
.subscribe
(
  (  val: any)=>{
    let fullNameFromToken=this.auth.getfullNameFromToken();
    this.unique_name=val || fullNameFromToken
  }
);
this.userStore.getRoleFromStrore().subscribe(val=>{
  let roleFromToken=this.auth.getRoleFromToken();
  this.role=val || roleFromToken;
})
  }

  logOut(){
    this.auth.signOut();
    setTimeout(() => {
      window.location.reload();
    }, 2);
  }
  public isLoggedIn(){
    return this.auth.isLoggedin();
    }
}
