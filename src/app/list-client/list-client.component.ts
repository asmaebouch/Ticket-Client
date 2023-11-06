import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SuperHeroService } from '../services/super-hero.service';
import { SuperHero } from '../models/super-hero';
import { NgToastService } from 'ng-angular-popup';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent {
  @Input() hero: SuperHero | undefined; // Remplacez 'any' par le type de données attendu
  itemsPerPage: number = 6;
  currentPage: number = 1;
  heroes:SuperHero[]=[];
  heroToEdit?:SuperHero;
  @Output() heroesUpdate=new EventEmitter<SuperHero[]>();
  @ViewChild('exampleModal') exampleModal: any;
  private modalRef: NgbModalRef | undefined;

  constructor(private superHeroService:SuperHeroService,private toast:NgToastService,private modalService: NgbModal){}

    ngOnInit():void{
this.superHeroService.getSupperHeroes().
subscribe((result:SuperHero[])=>(this.heroes=result));
}
initNewHero() {
  this.hero = {
    nomClient: '', // ou le nom par défaut
    contratClient:'',
    numeroContratMaintenance:'',
    isDisabled:false,
    // Autres propriétés par défaut
  };
}
updateHeroList(heroes:SuperHero[]){
  this.heroes=heroes;
  this.ngOnInit();
}
editHero(hero: any) {
  this.hero = { ...hero }; // Set the form data to the existing role's data
  // Open the "editRoleModal" by targeting its ID
  document.getElementById('editRoleModal')?.classList.add('show');
}
deleteRole(hero: SuperHero) {
  if (hero && hero.id !== undefined) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir desactiver ce rôle ?');

    if (confirmation) {
      this.superHeroService.deleteHero(hero.id).subscribe(() => {
        alert("Client a bien été desactiver");
        this.heroes = this.heroes.filter(h => h.id !== hero.id);
      });
    }
  } else {
    console.error('Client invalide ou client.id non défini');
  }
}

toggleRoleStatus(hero: any) {
  hero.IsDisabled = !hero.IsDisabled;
  
  if (hero && hero.id !== undefined) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir desactiver ce client ?');

    if (confirmation) {
      this.superHeroService.deleteHero(hero.id).subscribe(() => {
        this.toast.success({detail:"SUCCESS",summary:"Client a bien été desactiver",duration:5000})
        this.heroes = this.heroes.filter(h => h.id !== hero.id);
      });
    }
  } else {
    console.error('Client invalide ou client.id non défini');
  }
  
}

 /*deleteHero(hero: any) {
    // L'ID du héros est défini, vous pouvez procéder à la suppression
   this.superHeroService.deleteHero(hero.id).subscribe(
      (resp) => {
        // Suppression réussie, mettez à jour la liste des héros
        console.log(resp);
        alert("Projet a bien été supprimé");
        this.ngOnInit();

      },
      (err)=> console.log(err)
    );
 
}*/
updateHero(hero: SuperHero) {
  if (hero && hero.id) {
    this.superHeroService.updateHero(hero.id,hero).subscribe((heroes) => {
      this.heroesUpdate.emit(heroes);
      this.toast.success({detail:"SUCCESS",summary:"Client a bien été modifié",duration:5000})
      this.ngOnInit();
      this.closeEditClientModal();

    });
  } else {
    console.error("Invalid Client object or hero.id is undefined.");
  }
}
createHero(hero: SuperHero) {
  if (hero  ) {
    this.superHeroService.createHero(hero).subscribe(
      (newHero:any) => {
       console.log(newHero);
       this.toast.success({detail:"SUCCESS",summary:"Client a bien été créé",duration:5000})

       this.modalService.dismissAll();

        this.ngOnInit();
        this.closeAddClientModal();

      },
      (error) => {
        // Handle error responses from the server, e.g., validation errors
        console.error("Client creation failed:", error);
        alert("Erreur lors de la création du Client. Veuillez vérifier les données.");
      }
    );
  } else {
    alert("Nom du Client ne peut pas être vide.");
  }
}

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
closeAddClientModal() {
  if (this.modalRef) {
    this.modalRef.close();
  }
}

// Function to close the "Modifier" modal
closeEditClientModal() {
  const editClientModal = document.getElementById('editRoleModal');
  if (editClientModal) {
    // Trigger Bootstrap modal hide method
    editClientModal.dispatchEvent(new Event('hidden.bs.modal'));
  }
}
}
