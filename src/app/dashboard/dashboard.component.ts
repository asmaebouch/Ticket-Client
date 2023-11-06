import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserstoreService } from '../services/userstore.service';
import { FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Ticket2 } from '../models/super-hero';
import { PLateformeService } from '../plateforme.service';
import { ServiceCategoriesService } from '../service-categories.service';
import { TicketService } from '../ticket.service';
import { UtilisateurserveService } from '../utilisateurserve.service';
import { QualificationService } from '../qualification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit{
  public unique_name:string="";
  public role:string="";
  selectedFile!: File;
  previousServiceId!: number;
  previousPlateformeId!: number;

constructor(private qualificataion:QualificationService,private auth:AuthService,private utilisateur:UtilisateurserveService,private userStore:UserstoreService,private superHeroService:TicketService,private toast:NgToastService,private service :ServiceCategoriesService,private plateforme:PLateformeService,private usr:UserstoreService){}
public UserId:string="";

public UtilisateurId:string="";

ngOnInit() {   
  

  if (this.hero) {
    this.selectedPlateforme = this.hero.plateformeId ? this.hero.plateformeId : null;
    this.selectedPlateforme2 = this.hero.serviceId ? this.hero.serviceId : null;
    // Set other properties as needed
  }
  this.utilisateur.getRole().subscribe(
    (secteurs: any[]) => {
      this.sectorsU = secteurs;
      console.log(secteurs);
      console.log(" l'utilisateur  choisit est ",this.sectorsU)
  ;      },
    (error: any) => {
      console.log(error);
    }
  );
  const userId = this.auth.getUserIdFromToken();
  if (userId) {
    this.UserId = userId;
    this.UtilisateurId=userId;
    console.log('ID de l\'utilisateur :', this.UserId);
    // Reste de votre code...
  } else {
    console.log('La propriété UserId est introuvable dans l\'objet décodé.');
  }
//@ts-ignore
this.hero = {
  initiateur: '', 
  imgPath:this.response.dbPath,

  // ou le nom par défaut
  // Autres propriétés par défaut
  //@ts-ignore
  attachedFile: new FormControl(null)

};

this.qualificataion.getRole().subscribe(
  (secteurs:any[])=>{
    this.sectorsQ=secteurs;
    console.log(" la qualification  choisit est ",this.sectorsQ)

  }
);

  this.service.getRole().subscribe(

    (secteurs: any[]) => {
      this.sectors = secteurs;
      console.log(" le secteur choisit est ",this.sectors)
;      },
    (error: any) => {
      console.log(error);
    }
  ); 
  this.plateforme.getRole().subscribe(

    (secteurs: any[]) => {
      this.sectors3 = secteurs;
      console.log(this.sectors3)
;      },
    (error: any) => {
      console.log(error);
    }
  );
this.userStore.getFullNameeFromStore()
.subscribe
(
  (  val: any)=>{
    let fullNameFromToken=this.auth.getfullNameFromToken();
    this.unique_name=val || fullNameFromToken
  }
);
this.userStore.getRoleFromStrore().subscribe(val => {
  let roleFromToken = this.auth.getRoleFromToken();
  this.role = val || roleFromToken;

  const userIdAsNumber = parseInt(this.UserId, 10); // Utilisez parseInt avec une base de 10

  if (this.role === 'Administrateur') {
    this.superHeroService.getTicket2().subscribe((result: Ticket2[]) => {
      this.heroes = result;
    });
  } else {
    this.superHeroService.getTicket(userIdAsNumber).subscribe((result: Ticket2[]) => {
      this.heroes = result;
    });
  }
});

   const userIdAsNumber = parseInt(this.UserId, 10); // Use parseInt with base 10
//this.superHeroService.getTicket(userIdAsNumber).subscribe((result:Ticket2[])=>(this.heroes=result));

  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
 

  logOut(){   //@ts-ignore

this.superHeroService.getTicket().subscribe((result:Ticket[])=>(this.heroes=result));
  }
  public isLoggedIn(){
    return this.auth.isLoggedin();
    }  @Input() hero: Ticket2 | undefined; // Remplacez 'any' par le type de données attendu
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
      selectedPlateforme2: number | null = null;
      selectedPlateforme3:number|null=null;
      selectedPlateforme4:number|null=null;
      sectors: any[] =[ 
      ] ;
      sectorsU: any[] =[] ;
      sectorsQ: any[] =[ 
      ] ;
      sectors3: any[]=[] ;
        sectors2: string[] = [];
        serviceId!:number; 
        plateformeId!:number;
    public response={dbPath:''}
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
    tableVisible = false;
    tableVisible2 = false;

//...

toggleTableVisibility() {
  this.tableVisible = !this.tableVisible;
}
toggleTableVisibility2() {
  this.tableVisible2 = !this.tableVisible2;
}
    onPlatformChange() {
      this.selectedPlateforme!=this.hero?.plateformeId;
     
      console.log("Selected platform:", this.hero?.plateformeId);
      console.log("selct service",this.hero?.serviceId)
      console.log("select user",this.selectedPlateforme3);
      console.log("select qualification",this.selectedPlateforme4);
      if (this.hero?.plateformeId !== this.previousPlateformeId) {
        // Handle the change here
        console.log("PlateformeId has been modified.");
        // You have access to both the new and previous values
      }
    }
    public createImgPath(serverPath: any) {
      return `http://localhost:7011/${serverPath}`; 

    }
    
    public uploadFinished=(event: { dbPath: ""; })=>{
      this.response=event;
      console.log("paath",this.response);
    }
    createHero(hero: Ticket2) {  
      
      const userIdAsNumber2 = parseInt(this.UtilisateurId, 10); // Use parseInt with base 10

          //@ts-ignore
      const userIdAsNumber = parseInt(this.UserId, 10); // Use parseInt with base 10
      if (!isNaN(userIdAsNumber)) {
        // Only assign the user ID as a number if the conversion is successful
        hero.userId = userIdAsNumber;
        hero.utilisateurId=userIdAsNumber2;
        // Rest of your code...
      } 
            console.log('ID de l\'utilisateur :', hero.userId);
      console.log(this.sectors3);
      console.log(" le plateform  choisit est ",this.selectedPlateforme)
      //imgPath: this.response;
      //hero.imgPath = this.response.dbPath;
     
      hero.imgPath=this.response.dbPath; // Assuming this.response.dbPath contains the correct image path
      console.log('Image Path:', hero.imgPath);

      if (hero && this.selectedPlateforme !== null) {
        // Check if plateformeId is not null (i.e., a valid Plateforme is selected)
        hero.plateformeId = this.selectedPlateforme; // Assign the selected PlateformeId
        console.log(" le plateform  choisit est ",this.selectedPlateforme)
        hero.serviceId = this.serviceId; // Assign the selected ServiceId
        hero.imgPath=this.response.dbPath; // Assuming this.response.dbPath contains the correct image path
        hero.solverUserId!=this.selectedPlateforme3;
console.log("heror",hero);
//hero.imgPath = hero.imgPath.replace(/\\/g, '/');

// Now hero.imgPath will contain forward slashes
//console.log('Updated Image Path:', hero.imgPath);
        this.superHeroService.createTicket(hero).subscribe(
          (newHero: any) => {
            console.log(newHero);
            this.toast.success({ detail: "SUCCESS", summary: "Ticket a bien été créé", duration: 5000 });
  
            this.ngOnInit();
            this.signUpForm.reset();
          },
          (error) => {
            this.toast.success({ detail: "SUCCESS", summary: "Ticket a bien été créé", duration: 5000 });
            this.ngOnInit();
            this.signUpForm.reset();
            console.log(hero);
            // Handle error responses from the server, e.g., validation errors
            console.error("Role creation failed:", error);
            alert("Erreur lors de la création du rôle. Veuillez vérifier les données.");
          }
        );
      } else {
        alert("Veuillez sélectionner une Plateforme et un Service valides.");
      }
    }
    initNewHero() {
      //@ts-ignore
      this.hero = {
        initiateur: '',
        imgPath:this.response.dbPath,
       
         // ou le nom par défaut
        // Autres propriétés par défaut
      };
    }
    editHero(hero: any) {
      // Check if hero has serviceId and plateformeId before accessing them
      this.previousServiceId = hero.serviceId ? hero.serviceId : null;
      this.previousPlateformeId = hero.plateforme ? hero.plateforme.nomPlateforme : '';
      if (this.selectedPlateforme !== null) {
        hero.plateformeId = this.selectedPlateforme;
      }
    console.log(hero.initiateur);
    console.log(hero.plateformeId);

      this.hero = { ...hero }; // Set the form data to the existing role's data
      // Open the "editRoleModal" by targeting its ID
    
      document.getElementById('editRoleModal')?.classList.add('show');
    }
    
    // Modifier un héros existant
    updateHero(hero: Ticket2) {
      hero.userId != this.selectedPlateforme2;
      hero.solverUserId != this.selectedPlateforme3;
      this.previousServiceId = hero.serviceId;
      if (this.selectedPlateforme3 !== null) {
        hero.solverUserId = this.selectedPlateforme3; // Only assign when it's not null
        hero.utilisateurId = this.selectedPlateforme3;
      }
      if (this.selectedPlateforme4 !== null) {
        hero.qualificationId = this.selectedPlateforme4;
      }
      const userIdAsNumber = parseInt(this.UserId, 10); // Use parseInt with base 10
      if (!isNaN(userIdAsNumber)) {
        // Only assign the user ID as a number if the conversion is successful
        hero.userId = userIdAsNumber;
      }
    
      // Modify the property names and ensure they are of type number
      hero.plateformeId = hero.plateformeId;
      hero.serviceId = hero.serviceId;
    
      console.log("select user2", this.selectedPlateforme3);
      console.log("l'utilisateur est", hero.solverUserId);
      console.log("qualification est", hero.qualificationId);
    
      if (hero && hero.id2) {
        this.superHeroService.updateHero(hero.id2, hero).subscribe((heroes: Ticket2[] | undefined) => {
          this.heroesUpdate.emit(heroes);
          this.toast.success({ detail: "SUCCESS", summary: "Ticket a bien été modifié", duration: 5000 });
          this.ngOnInit();
          this.signUpForm.reset();
        });
        console.log(hero);
      } else {
        console.error("Invalid hero object or Ticket.id is undefined.");
      }
    }
    
    
    /*editHero(hero:Role){
      this.heroToEdit=hero;
      this.ngOnInit();
    
    }*/
    loadHeroes() {
      const userIdAsNumber = parseInt(this.UserId, 10); // Use parseInt with base 10

      this.superHeroService.getTicket(userIdAsNumber).subscribe((result: Ticket2[]) => {
        this.heroes = result;
        console.log("heror",this.heroes);

      });
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
