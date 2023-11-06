import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Affectation } from '../models/super-hero';
import { TicketService } from '../ticket.service';
import { AffectationService } from '../affectation.service';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent {
  @Input() hero: Affectation | undefined; // Remplacez 'any' par le type de données attendu
  @ViewChild('exampleModal') modal: any;
  @Output() heroCreated = new EventEmitter<Affectation>(); // Emit a single Role object when a role is created
  public signUpForm!: FormGroup;

    heroes:Affectation[]=[];
    heroToEdit?:Affectation;
    @Output() heroesUpdate=new EventEmitter<Affectation[]>();
    editedRole: any = {}; // You can change 'any' to the actual type of your role object
  
    constructor(private superHeroService:AffectationService){}
      ngOnInit():void{
  this.superHeroService.getTicket().subscribe(
    (result:Affectation[])=>(this.heroes=result));
  }
  /*updateHeroList(heroes:Role[]){
    this.heroes=heroes;
  
    this.ngOnInit();
  
  }*/
  
  createHero(hero: Affectation) {
    if (hero  ) {
      this.superHeroService.createTicket(hero).subscribe(
        (newHero:any) => {
         console.log(newHero);
          alert("Affectation a bien été créé");
         
          this.ngOnInit();
          this.signUpForm.reset();
        },
        (error) => {
          // Handle error responses from the server, e.g., validation errors
          console.error("Affectation creation failed:", error);
          alert("Erreur lors de la création du Affectation. Veuillez vérifier les données.");
        }
      );
    } else {
      alert("Nom du Affectation ne peut pas être vide.");
    }
  }
  
  initNewHero() {
    //@ts-ignore
    this.hero = {
      initiateur: '', // ou le nom par défaut
      // Autres propriétés par défaut
    };
  }
  editHero(hero: any) {
    this.hero = { ...hero }; // Set the form data to the existing role's data
    // Open the "editRoleModal" by targeting its ID
    document.getElementById('editRoleModal')?.classList.add('show');
  }
  // Modifier un héros existant
  updateHero(hero: Affectation) {
    if (hero && hero.id) {
      this.superHeroService.updateHero(hero.id,hero).subscribe((heroes) => {
        this.heroesUpdate.emit(heroes);
        alert("Affectation a bien été modifié");
      
        this.ngOnInit();
        this.signUpForm.reset();
  
      });
    } else {
      console.error("Invalid hero object or Affectation.id is undefined.");
    }
  }
  /*editHero(hero:Role){
    this.heroToEdit=hero;
    this.ngOnInit();
  
  }*/
  loadHeroes() {
    this.superHeroService.getTicket().subscribe((result: Affectation[]) => {
      this.heroes = result;
    });
  }
  deleteRole(hero: Affectation) {
    if (hero && hero.id !== undefined) {
      this.superHeroService.deleteTicket(hero.id).subscribe(() => {
        // After successful deletion, remove the hero from the local array
        alert("Affectation a bien été supprimé");
  
        this.heroes = this.heroes.filter(h => h.id !== hero.id);
      });
    } else {
      console.error('Invalid Affectation or Ticket.id is undefined');
    }
}
}
