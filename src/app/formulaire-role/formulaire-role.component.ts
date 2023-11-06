import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role, SuperHero } from '../models/super-hero';
import { SuperHeroService } from '../services/super-hero.service';
import { RoleserveService } from '../roleserve.service';

@Component({
  selector: 'app-formulaire-role',
  templateUrl: './formulaire-role.component.html',
  styleUrls: ['./formulaire-role.component.css']
})
export class FormulaireRoleComponent {

  @Input() hero: Role | undefined; // Remplacez 'any' par le type de données attendu
   heroToEdit?:Role; @Output() heroesUpdate=new EventEmitter<Role[]>();
   heroes:Role[]=[];

  constructor(private superHeroService:RoleserveService){}
  ngOnInit():void{
    this.superHeroService.getRole().subscribe((result:Role[])=>(this.heroes=result));
    
    }
    updateHero(hero: Role) {
      if (hero && hero.id) {
        const newRoleName = "nouveau_nom_du_role";
        // Ensure hero and hero.id are defined
        this.superHeroService.updateHero(hero.id,hero.nom).subscribe((heroes) => {
          this.heroesUpdate.emit(heroes);
          alert("Rôle a bien été modifié");
        });
      } else {
        console.error("Invalid hero object or hero.id is undefined.");
      }
    }
    
    
    deleteHero(hero: any) {
      this.superHeroService.deleteRole(hero.id).subscribe(() => {
        // Suppression réussie, émettez l'événement avec le héros supprimé

        this.deleteHero(hero);
        alert("role a bien été supprimer");

        this.ngOnInit();

      }, (error) => {
        // Gérer les erreurs si nécessaire
        console.error('Erreur lors de la suppression du héros :', error);
      });
    }
    
    createHero(hero:Role){
      this.superHeroService.createHero(hero).subscribe((heroes)=>this.heroesUpdate.emit(heroes));
      this.ngOnInit();
      alert("role a bien été creer");

    } // Assurez-vous que le type correspond à votre modèle de données
    isHeroModalVisible = false;
  
    
  
    closeForm() {
      this.heroToEdit = undefined;
    }
    
    
}
