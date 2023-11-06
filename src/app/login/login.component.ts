import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,PatternValidator,Validators } from '@angular/forms';
import { UtilisateurserveService } from '../utilisateurserve.service';
import ValidateForm from '../helpers/validatores';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserstoreService } from '../services/userstore.service';
import { ResetPasswordServiceService } from '../services/reset-password-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  loginForm!:FormGroup ;
  public resetPasswordEmail!:string;
public isValidEmail!:boolean;
  constructor(private fb:FormBuilder,private userService: UtilisateurserveService,
    private auth:AuthService,
    private router:Router,
   private toast:NgToastService,
   private userstore:UserstoreService,
   private resetService:ResetPasswordServiceService){}
   ngOnInit(): void {
    this.loginForm=this.fb.group({
      login:['',Validators.required],
      mdp:['',Validators.required]
    })
  }
  hideShowPass(){
this.isText=!this.isText;
this.isText ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
this.isText ? this.type="text":this.type="password";
  }
  onLogin(){
    if(this.loginForm.valid){
//send the obj to databse 
console.log(this.loginForm.value)
this.auth .login(this.loginForm.value).
subscribe
({
  next:(res)=>{
  
    console.log(res.message);
    this.loginForm.reset();
    this.auth.storeToken(res.accessToken);
    this.auth.storeRefreshToken(res.refreshToken);
    const tokenPayload = this.auth.decodeToken();
    this.userstore.setFullNameForStore(tokenPayload.name);
    this.userstore.setRoleForStore(tokenPayload.role);
    this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
   // this.router.navigate(['dashboard'])
   console.log('Response:', res);
   console.log('Access Token:', res.accessToken);
   console.log('Refresh Token:', res.refreshToken);
    this.router.navigate(['/dashboard']);
    setTimeout(() => {
      window.location.reload();
    }, 2);

  },
  error:(err)=>{
    this.toast.error({detail:"ERROR",summary:"Something when wrong!",duration:5000})

    //alert(err?.error.message)
  }
})


    }else{
//throw the error using toaster and with requir fields
ValidateForm.validateAllFormFileds(this.loginForm);
alert("your form is invalid")


    }
  }
  checkValidEmail(event:string){
    const value=event;
    const patern=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail=patern.test(value);
    return this.isValidEmail;
  }
  
  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
      
      this.resetService.sendRestPasswordLink(this.resetPasswordEmail).subscribe({
        next:(res)=>{
          this.toast.success({
            detail:'success',
            summary:'reset success',
            duration:3000,
          });
          this.resetPasswordEmail="";
      const buttonRef=document.getElementById("closebtn");
      buttonRef?.click();
        },
        error:(err)=>{
          this.toast.error({
            detail:'Error',
            summary:'Something wentt wrong',
            duration:3000,
          });
        } 
      })
    }
  }
}
