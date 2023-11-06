import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SuperHero, Utilisateur } from '../models/super-hero';
import { SuperHeroService } from '../services/super-hero.service';
import { UtilisateurserveService } from '../utilisateurserve.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent  implements OnInit{
  [x: string]: any;
  @Input() hero: any; // Remplacez 'any' par le type de données attendu
@Output() heroesUpdate=new EventEmitter<SuperHero[]>();
heroes:SuperHero[]=[];

constructor(private superHeroService:SuperHeroService,private utilisateurService:UtilisateurserveService){}
sectors: { id: number, nom: string, prenom: String }[] = [];
sectors2: { id: number, nom: string, prenom: string}[] = [];

  utilisateursClient: any[] = []; // Utilisateurs qui travaillent chez le client
  utilisateursPrestige: any[] = []; 
  utilisateurs: any[] = []; // Liste complète des utilisateurs

  ngOnInit(): void {
  /*  this.superHeroService.getSupperHeroes().subscribe(
      (result: SuperHero[]) => {
        this.heroes = result;
      }
    );
  
    this.utilisateurService.getRole().subscribe(
      (secteurs: any[]) => {
        // Séparer les utilisateurs en fonction de 'travaillechezclient'
        this.sectors = secteurs.filter(user => user.travailleChezLeClient === false);
        this.sectors2 = secteurs.filter(user => user.travailleChezLeClient === true);
      },
      (error: any) => {
        console.log(error);
      }
    );*/
  }

 /* updateHero(hero:SuperHero){
this.superHeroService.updateHero(hero).subscribe((heroes)=>this.heroesUpdate.emit(heroes));
  }
  deleteHero(hero: any) {
    this.superHeroService.deleteHero(hero.id).subscribe(() => {
      // Suppression réussie, émettez l'événement avec le héros supprimé
      this.deleteHero(hero);
    }, (error) => {
      // Gérer les erreurs si nécessaire
      console.error('Erreur lors de la suppression du héros :', error);
    });
  }
  
  createHero(hero:SuperHero){
    this.superHeroService.createHero(hero).subscribe((heroes)=>this.heroesUpdate.emit(heroes));

  } // Assurez-vous que le type correspond à votre modèle de données
  isHeroModalVisible = false;

  // ...

  // Fonction pour afficher le modèle/modal
  showHeroModal() {
    this.isHeroModalVisible = true;
  }

  // Fonction pour masquer le modèle/modal
  hideHeroModal() {
    this.isHeroModalVisible = false;
  }

  // Vous pouvez appeler cette fonction lorsque vous avez terminé de modifier ou d'ajouter un héros
  onHeroSaved() {
    this.hideHeroModal();}*/
  
}
