import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Plateforme, ServiceCateg } from '../models/super-hero';
import { NgToastService } from 'ng-angular-popup';
import { PLateformeService } from '../plateforme.service';
import { ServiceCategoriesService } from '../service-categories.service';

@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.css']
})
export class ServiceCategoriesComponent {
  @Input() hero: ServiceCateg | undefined; // Remplacez 'any' par le type de données attendu
@ViewChild('exampleModal') modal: any;
@Output() heroCreated = new EventEmitter<ServiceCateg>(); // Emit a single Role object when a role is created
itemsPerPage: number = 8;
currentPage: number = 1;
  heroes:ServiceCateg[]=[];
  heroToEdit?:ServiceCateg;
  @Output() heroesUpdate=new EventEmitter<ServiceCateg[]>();
  editedRole: any = {}; // You can change 'any' to the actual type of your role object

  constructor(private superHeroService:ServiceCategoriesService,private toast:NgToastService){}
    ngOnInit():void{
this.superHeroService.getRole().subscribe((result:ServiceCateg[])=>(this.heroes=result));
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
createHero(hero: ServiceCateg) {
  if (hero && hero.nomService ) {
    this.superHeroService.createHero(hero).subscribe(
      (newHero:any) => {
       console.log(newHero);
       this.toast.success({detail:"SUCCESS",summary:"ServiceCateg a bien été créé",duration:5000})


        this.ngOnInit();
      },
      (error) => {
        // Handle error responses from the server, e.g., validation errors
        console.error("ServiceCateg creation failed:", error);
        alert("Erreur lors de la création du ServiceCateg. Veuillez vérifier les données.");
      }
    );
  } else {
    alert("Nom du ServiceCateg ne peut pas être vide.");
  }
}

initNewHero() {
  //@ts-ignore
  this.hero = {
    nomService: '', // ou le nom par défaut
    // Autres propriétés par défaut
  };
}
editHero(hero: any) {
  this.hero = { ...hero }; // Set the form data to the existing role's data
  // Open the "editRoleModal" by targeting its ID
  document.getElementById('editRoleModal')?.classList.add('show');
}
// Modifier un héros existant
updateHero(hero: ServiceCateg) {
  if (hero && hero.id) {
    this.superHeroService.updateHero(hero.id,hero).subscribe((heroes) => {
      this.heroesUpdate.emit(heroes);
      this.toast.success({detail:"SUCCESS",summary:"ServiceCateg a bien été modifié",duration:5000})

    
      this.ngOnInit();

    });
  } else {
    console.error("Invalid hero object or ServiceCateg.id is undefined.");
  }
}
/*editHero(hero:Role){
  this.heroToEdit=hero;
  this.ngOnInit();

}*/
loadHeroes() {
  this.superHeroService.getRole().subscribe((result: ServiceCateg[]) => {
    this.heroes = result;
  });
}

toggleRoleStatus(hero: any) {
  hero.IsDisabled = !hero.IsDisabled;
  
  const confirmation = window.confirm('Êtes-vous sûr de vouloir desactiver ce service ?');

  if (confirmation) {
  this.superHeroService.deleteRole(hero.id).subscribe(
    () => {
      this.toast.success({detail:"SUCCESS",summary:"Service a bien été supprimé",duration:3000})
      this.ngOnInit();
    });
  }
  else {
      console.error("Erreur lors de la mise à jour de l'état de désactivation dans la base de données:");
      hero.IsDisabled = !hero.IsDisabled;
    }

}
IsDisabled = false;
/*deleteRole(hero: ServiceCateg) {
  if (hero && hero.id !== undefined) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir desactiver ce ServiceCateg ?');

    if (confirmation) {
      this.superHeroService.deleteRole(hero.id).subscribe(() => {
        // Après la suppression réussie, retirez le rôle du tableau local
        this.toast.success({detail:"SUCCESS",summary:"ServiceCateg a bien été supprimé",duration:5000})
        this.heroes = this.heroes.filter(h => h.id !== hero.id);
        hero.isDisabled = true;

      });
    }
  } else {
    console.error('Héros invalide ou ServiceCateg.id non défini');
  }
  
}
*/

closeForm() {
  this.heroToEdit = undefined;
}
}
