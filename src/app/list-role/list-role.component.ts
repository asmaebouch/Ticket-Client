import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Role, SuperHero } from '../models/super-hero';
import { RoleserveService } from '../roleserve.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent {
  @Input() hero: Role | undefined; // Remplacez 'any' par le type de données attendu
@ViewChild('exampleModal') modal: any;
@Output() heroCreated = new EventEmitter<Role>(); // Emit a single Role object when a role is created
itemsPerPage: number = 8;
currentPage: number = 1;
  heroes:Role[]=[];
  heroToEdit?:Role;
  @Output() heroesUpdate=new EventEmitter<Role[]>();
  editedRole: any = {}; // You can change 'any' to the actual type of your role object

  constructor(private superHeroService:RoleserveService,private toast:NgToastService){}
    ngOnInit():void{
this.superHeroService.getRole().subscribe((result:Role[])=>(this.heroes=result));
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
createHero(hero: Role) {
  if (hero && hero.nom ) {
    this.superHeroService.createHero(hero).subscribe(
      (newHero:any) => {
       console.log(newHero);
       this.toast.success({detail:"SUCCESS",summary:"Rôle a bien été créé",duration:5000})


        this.ngOnInit();
      },
      (error) => {
        // Handle error responses from the server, e.g., validation errors
        console.error("Role creation failed:", error);
        alert("Erreur lors de la création du rôle. Veuillez vérifier les données.");
      }
    );
  } else {
    alert("Nom du rôle ne peut pas être vide.");
  }
}

initNewHero() {
  //@ts-ignore
  this.hero = {
    nom: '', // ou le nom par défaut
    // Autres propriétés par défaut
  };
}
editHero(hero: any) {
  this.hero = { ...hero }; // Set the form data to the existing role's data
  // Open the "editRoleModal" by targeting its ID
  document.getElementById('editRoleModal')?.classList.add('show');
}
// Modifier un héros existant
updateHero(hero: Role) {
  if (hero && hero.id) {
    this.superHeroService.updateHero(hero.id,hero.nom).subscribe((heroes) => {
      this.heroesUpdate.emit(heroes);
      this.toast.success({detail:"SUCCESS",summary:"Rôle a bien été modifié",duration:5000})

    
      this.ngOnInit();

    });
  } else {
    console.error("Invalid hero object or hero.id is undefined.");
  }
}
/*editHero(hero:Role){
  this.heroToEdit=hero;
  this.ngOnInit();

}*/
loadHeroes() {
  this.superHeroService.getRole().subscribe((result: Role[]) => {
    this.heroes = result;
  });
}toggleRoleStatus(hero:Role) {
  hero.isDisabled = !hero.isDisabled;
}

IsDisabled = false;
deleteRole(hero: Role) {
  if (hero && hero.id !== undefined) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir desactiver ce rôle ?');

    if (confirmation) {
      this.superHeroService.deleteRole(hero.id).subscribe(() => {
        // Après la suppression réussie, retirez le rôle du tableau local
        this.toast.success({detail:"SUCCESS",summary:"Rôle a bien été supprimé",duration:5000})
        this.heroes = this.heroes.filter(h => h.id !== hero.id);
        hero.isDisabled = true;

      });
    }
  } else {
    console.error('Héros invalide ou hero.id non défini');
  }
  
}


closeForm() {
  this.heroToEdit = undefined;
}
}
