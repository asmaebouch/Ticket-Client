import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Ticket2 } from '../models/super-hero';
import { PLateformeService } from '../plateforme.service';
import { ServiceCategoriesService } from '../service-categories.service';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent {
  @Input() hero: Ticket2 | undefined; // Remplacez 'any' par le type de données attendu
  @ViewChild('exampleModal') modal: any;
  @Output() heroCreated = new EventEmitter<Ticket2>(); // Emit a single Role object when a role is created
  public signUpForm!: FormGroup;
  itemsPerPage: number = 7;
  currentPage: number = 1;
    heroes:Ticket2[]=[];
    heroToEdit?:Ticket2;
    @Output() heroesUpdate=new EventEmitter<Ticket2[]>();
    editedRole: any = {}; // You can change 'any' to the actual type of your role object
    selectedPlateforme: number | null = null;
    constructor(private superHeroService:TicketService,private toast:NgToastService,private service :ServiceCategoriesService,private plateforme:PLateformeService){}
    sectors: any[] =[ 
    ] ;
    sectors3: any[]=[] ;
      sectors2: string[] = [];selectedFile: File | null = null;

      serviceId!:number; plateformeId!:number;
    ngOnInit():void{ 

        this.service.getRole().subscribe(

        (secteurs: any[]) => {
          this.sectors = secteurs;
          console.log(" le secteur choisit est ",this.sectors)
  ;      },
        (error: any) => {
          console.log(error);
        }
      ); this.plateforme.getRole().subscribe(

        (secteurs: any[]) => {
          this.sectors3 = secteurs;
          console.log(this.sectors3)
  ;      },
        (error: any) => {
          console.log(error);
        }
      );
 // this.superHeroService.getTicket().subscribe((result:Ticket2[])=>(this.heroes=result));
  }
  /*updateHeroList(heroes:Role[]){
    this.heroes=heroes;
  
    this.ngOnInit();
  
  }*/
  //@ts-ignore
  ticket: Ticket3 = {
    PlateformeId: null, // Initialize to null
    ServiceId: null,    // Initialize to null
    // other ticket properties
  };

  onPlatformChange() {
    console.log("Selected platform:", this.selectedPlateforme);
    console.log("selct service",this.serviceId)
  }
  
  createTicket(hero: Ticket2) {
    console.log(this.sectors3)
    const plateformeId = parseInt(this.selectedPlateforme!.toString(), 10);
    const serviceId = parseInt(this.serviceId.toString(), 10);
    //console.log(" le secteur choisit est ",this.sectors)
    //console.log(" le plateform  choisit est ",this.sectors3)
   // hero.plateformeId = this.selectedPlateforme; // Assign the selected PlateformeId

    console.log(" le plateform  choisit est ",this.selectedPlateforme)

    if (hero && this.selectedPlateforme !== null) {
      // Check if plateformeId is not null (i.e., a valid Plateforme is selected)
      hero.plateformeId = this.selectedPlateforme; // Assign the selected PlateformeId
      console.log(" le plateform  choisit est ",this.selectedPlateforme)
      hero.serviceId = this.serviceId; // Assign the selected ServiceId

      this.superHeroService.createTicket(hero).subscribe(
        (newHero: any) => {
          console.log(newHero);
          this.toast.success({ detail: "SUCCESS", summary: "Ticket a bien été créé", duration: 5000 });

          this.ngOnInit();
          this.signUpForm.reset();
        },
        (error) => {
          // Handle error responses from the server, e.g., validation errors
          console.error("Ticket creation failed:", error);
          alert("Erreur lors de la création du Ticket. Veuillez vérifier les données.");
        }
      );
    } else {
      alert("Veuillez sélectionner une Plateforme et un Service valides.");
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
  updateHero(hero: Ticket2) {
    if (hero && hero.id2) {
      this.superHeroService.updateHero(hero.id2,hero).subscribe((heroes) => {
        this.heroesUpdate.emit(heroes);
        this.toast.success({detail:"SUCCESS",summary:"Ticket a bien été modifié",duration:5000})      
        this.ngOnInit();
        this.signUpForm.reset();
  
      });
    } else {
      console.error("Invalid hero object or Ticket.id is undefined.");
    }
  }
  /*editHero(hero:Role){
    this.heroToEdit=hero;
    this.ngOnInit();
  
  }*/
  loadHeroes() {
   /* this.superHeroService.getTicket().subscribe((result: Ticket2[]) => {
      this.heroes = result;
    });*/
  }toggleRoleStatus(hero:any) {
    hero.IsDisabled = !hero.IsDisabled;
  }
  deleteRole(hero: Ticket2) {
    if (hero && hero.id2 !== undefined) {
      // Demander la confirmation de l'utilisateur avant de supprimer le ticket
      const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce ticket ?");
  
      if (confirmDelete) {
        this.superHeroService.deleteTicket(hero.id2).subscribe(() => {
          // After successful deletion, remove the hero from the local array
          this.toast.success({ detail: "SUCCESS", summary: "Ticket a bien été supprimé", duration: 5000 });
  
          this.heroes = this.heroes.filter(h => h.id2 !== hero.id2);
        });
      }
    } else {
      console.error('Invalid Ticket or Ticket.id is undefined');
    }
  }
  
  
  closeForm() {
    this.heroToEdit = undefined;
  }
  get totalPages(): number {
    console.log(this.heroes.length);
    return Math.ceil(this.heroes.length / this.itemsPerPage);
  }
  get paginatedItems(): Ticket2[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.heroes.slice(startIndex, endIndex);
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    console.log('Previous page clicked. Current Page:', this.currentPage);
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    console.log('Next page clicked. Current Page:', this.currentPage);
  }
}
