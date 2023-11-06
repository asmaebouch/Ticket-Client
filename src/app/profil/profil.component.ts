import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserstoreService } from '../services/userstore.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  public unique_name:string="";
  public role:string="";
  public email:string="";
  public  given_name:string="";
  public family_name:string="";
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
this.userStore.getfamily_nameFromStore()
.subscribe
(
  (  val: any)=>{
    let fullNameFromToken=this.auth.getfamily_nameFromToken
    ();
    this.family_name=val || fullNameFromToken
  }
);
this.userStore.getgiven_nameFromStore()
.subscribe
(
  (  val: any)=>{
    let fullNameFromToken=this.auth.getgiven_nameFromToken
    ();
    this.given_name=val || fullNameFromToken
  }
);
this.userStore.getEmailFromStrore()
.subscribe
(
  (  val: any)=>{
    let fullNameFromToken=this.auth.getfullEmailFromToken
    ();
    this.email=val || fullNameFromToken
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
