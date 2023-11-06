import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role, Utilisateur } from '../models/super-hero';
import { RoleserveService } from '../roleserve.service';
import { UtilisateurserveService } from '../utilisateurserve.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from '../helpers/validatores';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-formulaire-utilisateur',
  templateUrl: './formulaire-utilisateur.component.html',
  styleUrls: ['./formulaire-utilisateur.component.css']
})
export class FormulaireUtilisateurComponent {
  public signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"
  constructor(private fb : FormBuilder, private auth:AuthService , private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      login:['',Validators.required],
      mdp:['',Validators.required]
    })
  }


  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'password'
  }
 /* onSignup() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
    
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
        
          alert(res.message);
          this.signUpForm.reset();
        }),
        error:(err=>{
          console.error(err); // Log the entire error object for more information

          alert(err?.error?.message || 'An error occurred'); // Display a generic error message
        })
      })
      console.log(this.signUpForm.value)
    } else {
      ValidateForm.validateAllFormFileds(this.signUpForm);

    }
  }*/
 
}
