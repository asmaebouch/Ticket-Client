import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ChanagerMdpService } from '../chanager-mdp.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-chanager-mdp',
  templateUrl: './chanager-mdp.component.html',
  styleUrls: ['./chanager-mdp.component.css']
})
export class ChanagerMdpComponent {
  hero: any = {}; // Initialisation de l'objet hero

  message = '';
  
  constructor(private http: HttpClient, private changerpasservice: ChanagerMdpService,private toast:NgToastService) {}

  changePassword() {
    console.log("jamil");

    // Check if newPassword and confirmPassword match
    if (this.hero.newPassword !== this.hero.confirmPassword) {
    return  this.toast.error({detail:"Erroor",summary:"Mot De passe ne sont pas identique",duration:5000})
      ;
    }


    const changePasswordData = {
      oldPassword: this.hero.oldPassword,
      newPassword: this.hero.newPassword,
    };
    
    this.changerpasservice.changePassword(changePasswordData).subscribe(
        (response) => {
          this.toast.success({detail:"SUCCESS",summary:"Mot De passe a bien été modifer",duration:5000})

            // Réinitialisez les champs de formulaire ou effectuez d'autres actions nécessaires.
            this.hero.oldPassword = '';
            this.hero.newPassword = '';
            this.hero.confirmPassword = '';
            this.message = '';
        },
        (error) => {
            console.error("Error changing password:", error);
            // Gérez les erreurs ici, affichez-les à l'utilisateur ou effectuez d'autres actions nécessaires.
        }
    );
  }
}
