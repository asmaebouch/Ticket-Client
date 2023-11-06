import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Plateforme, Role } from '../models/super-hero';
import { RoleserveService } from '../roleserve.service';
import { PLateformeService } from '../plateforme.service';

@Component({
  selector: 'app-plateforme',
  templateUrl: './plateforme.component.html',
  styleUrls: ['./plateforme.component.css']
})
export class PLateformeComponent {
  @Input() hero: Plateforme | undefined; // Remplacez 'any' par le type de données attendu
@ViewChild('exampleModal') modal: any;
@Output() heroCreated = new EventEmitter<Plateforme>(); // Emit a single Role object when a role is created
itemsPerPage: number = 8;
currentPage: number = 1;
  heroes:Plateforme[]=[];
  heroToEdit?:Plateforme;
  @Output() heroesUpdate=new EventEmitter<Plateforme[]>();
  editedRole: any = {}; // You can change 'any' to the actual type of your role object

  constructor(private superHeroService:PLateformeService,private toast:NgToastService){}
    ngOnInit():void{
this.superHeroService.getRole().subscribe((result:Plateforme[])=>(this.heroes=result));
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
createHero(hero: Plateforme) {
  if (hero && hero.nomPlateforme ) {
    this.superHeroService.createHero(hero).subscribe(
      (newHero:any) => {
       console.log(newHero);
       this.toast.success({detail:"SUCCESS",summary:"Plateforme a bien été créé",duration:5000})


        this.ngOnInit();
      },
      (error) => {
        // Handle error responses from the server, e.g., validation errors
        console.error("Plateforme creation failed:", error);
        alert("Erreur lors de la création du Plateforme. Veuillez vérifier les données.");
      }
    );
  } else {
    alert("Nom du Plateforme ne peut pas être vide.");
  }
}

initNewHero() {
  //@ts-ignore
  this.hero = {
    nomPlateforme: '', // ou le nom par défaut
    // Autres propriétés par défaut
  };
}
editHero(hero: any) {
  this.hero = { ...hero }; // Set the form data to the existing role's data
  // Open the "editRoleModal" by targeting its ID
  document.getElementById('editRoleModal')?.classList.add('show');
}
// Modifier un héros existant
updateHero(hero: Plateforme) {
  if (hero && hero.id) {
    this.superHeroService.updateHero(hero.id,hero).subscribe((heroes) => {
      this.heroesUpdate.emit(heroes);
      this.toast.success({detail:"SUCCESS",summary:"Plateforme a bien été modifié",duration:5000})

    
      this.ngOnInit();

    });
  } else {
    console.error("Invalid hero object or Plateforme.id is undefined.");
  }
}
/*editHero(hero:Role){
  this.heroToEdit=hero;
  this.ngOnInit();

}*/
loadHeroes() {
  this.superHeroService.getRole().subscribe((result: Plateforme[]) => {
    this.heroes = result;
  });
}toggleRoleStatus(hero: any) {
  hero.IsDisabled = !hero.IsDisabled;
  
  const confirmation = window.confirm('Êtes-vous sûr de vouloir desactiver cette platefrome ?');

  if (confirmation) {
  this.superHeroService.deleteRole(hero.id).subscribe(
    () => {
      this.toast.success({detail:"SUCCESS",summary:"Plateforme a bien été supprimé",duration:5000})
      this.ngOnInit();
    });
  }
  else {
      console.error("Erreur lors de la mise à jour de l'état de désactivation dans la base de données:");
      hero.IsDisabled = !hero.IsDisabled;
    }

}
IsDisabled = false;
/*deleteRole(hero: Plateforme) {
  if (hero && hero.id !== undefined) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir desactiver ce rôle ?');

    if (confirmation) {
      this.superHeroService.deleteRole(hero.id).subscribe(() => {
        // Après la suppression réussie, retirez le rôle du tableau local
        this.toast.success({detail:"SUCCESS",summary:"Plateforme a bien été supprimé",duration:5000})
        this.heroes = this.heroes.filter(h => h.id !== hero.id);
        hero.isDisabled = true;

      });
    }
  } else {
    console.error('Héros invalide ou Plateforme.id non défini');
  }
  
}*/


closeForm() {
  this.heroToEdit = undefined;
}
}
