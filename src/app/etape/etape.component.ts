import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Etape, Qualification } from '../models/super-hero';
import { QualificationService } from '../qualification.service';
import { EtapeService } from '../etape.service';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.css']
})
export class EtapeComponent {
  @Input() hero: Etape | undefined; // Remplacez 'any' par le type de données attendu
  @ViewChild('exampleModal') modal: any;
  @Output() heroCreated = new EventEmitter<Etape>(); // Emit a single Role object when a role is created
  itemsPerPage: number = 8;
  currentPage: number = 1;
    heroes:Etape[]=[];
    heroToEdit?:Etape;
    @Output() heroesUpdate=new EventEmitter<Etape[]>();
    editedRole: any = {}; // You can change 'any' to the actual type of your role object
  
    constructor(private superHeroService:EtapeService,private toast:NgToastService){}
      ngOnInit():void{
  this.superHeroService.getRole().subscribe((result:Etape[])=>(this.heroes=result));
  }
  /*updateHeroList(heroes:Role[]){
    this.heroes=heroes;
  
    this.ngOnInit();
  
  }*/
  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    //   return this.users?.slice(startIndex, endIndex);
    return this.heroes.slice(startIndex, endIndex);
  }
  get totalPages(): number {
   
    return Math.ceil(this.heroes.length / this.itemsPerPage);
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  createHero(hero: Etape) {
    if (hero && hero.nomEtape ) {
      this.superHeroService.createHero(hero).subscribe(
        (newHero:any) => {
         console.log(newHero);
         this.toast.success({detail:"SUCCESS",summary:"Etape a bien été créé",duration:5000})
  
  
          this.ngOnInit();
        },
        (error) => {
          // Handle error responses from the server, e.g., validation errors
          console.error("Etape creation failed:", error);
          alert("Erreur lors de la création du Etape. Veuillez vérifier les données.");
        }
      );
    } else {
      alert("Nom du Etape ne peut pas être vide.");
    }
  }
  
  initNewHero() {
    //@ts-ignore
    this.hero = {
      nomEtape: '', // ou le nom par défaut
      // Autres propriétés par défaut
    };
  }
  editHero(hero: any) {
    this.hero = { ...hero }; // Set the form data to the existing role's data
    // Open the "editRoleModal" by targeting its ID
    document.getElementById('editRoleModal')?.classList.add('show');
  }
  // Modifier un héros existant
  updateHero(hero: Etape) {
    if (hero && hero.id) {
      this.superHeroService.updateHero(hero.id,hero).subscribe((heroes) => {
        this.heroesUpdate.emit(heroes);
        this.toast.success({detail:"SUCCESS",summary:"Etape a bien été modifié",duration:5000})
  
      
        this.ngOnInit();
  
      });
    } else {
      console.error("Invalid hero object or Etape.id is undefined.");
    }
  }
  /*editHero(hero:Role){
    this.heroToEdit=hero;
    this.ngOnInit();
  
  }*/
  loadHeroes() {
    this.superHeroService.getRole().subscribe((result: Etape[]) => {
      this.heroes = result;
    });
  }toggleRoleStatus(hero:Etape) {
    hero.isDisabled = !hero.isDisabled;
  }
  
  IsDisabled = false;
  deleteRole(hero: Etape) {
    if (hero && hero.id !== undefined) {
      const confirmation = window.confirm('Êtes-vous sûr de vouloir desactiver cette Etape ?');
  
      if (confirmation) {
        this.superHeroService.deleteRole(hero.id).subscribe(() => {
          // Après la suppression réussie, retirez le rôle du tableau local
          this.toast.success({detail:"SUCCESS",summary:"Etape a bien été supprimé",duration:5000})
          this.heroes = this.heroes.filter(h => h.id !== hero.id);
          hero.isDisabled = true;
  
        });
      }
    } else {
      console.error('Héros invalide ou Etape.id non défini');
    }
    
  }
  
  
  closeForm() {
    this.heroToEdit = undefined;
  }
}
