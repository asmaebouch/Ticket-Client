import { Component, EventEmitter, Output } from '@angular/core';
import { Role, RoleUtilisateur, Utilisateur } from '../models/super-hero';
import { UtilisateurserveService } from '../utilisateurserve.service';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import ValidateForm from '../helpers/validatores';
import { RoleserveService } from '../roleserve.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.css']
})
export class ListUtilisateurComponent {
  heroes:Utilisateur[]=[];
  heroToEdit?:Utilisateur;
  @Output() heroesUpdate=new EventEmitter<Utilisateur[]>();
  itemsPerPage: number = 6;
  currentPage: number = 1;
  public signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"

  rolesUtilisateurs:any[]=[{
    roleId:[]
  },]
  client!:boolean;
  hero: any;
  constructor(private superHeroService:UtilisateurserveService,private toast:NgToastService,private api:ApiService,private fb : FormBuilder, private auth:AuthService,private role :RoleserveService){}
  sectors: any[] = [
    { nom: '' },
    { nom: '' },
    // Ajoutez d'autres objets avec une propriété 'nom' si nécessaire
  ];
    sectors2: string[] = [];
    onPlatformChange() {
      console.log("Selected roles:", this.selectedRoleId);
      
      // Map the selected role IDs to an array of objects with the structure { roleId: number }
      const rolesUtilisateurs = this.selectedRoleId.map(roleId => ({ roleId }));
  
      // Update the rolesUtilisateurs in the form
      this.signUpForm.get('rolesUtilisateurs')?.setValue(rolesUtilisateurs);
      console.log("Selected roles:", rolesUtilisateurs);

  }
  
    onPlatformChange2() {
      console.log("Selected client:", this.clientId);
      
      // Update rolesUtilisateurs when the role selection changes
      //@ts-ignore
      this.signUpForm.get('client')?.setValue(this.clientId === 'true');
    }
  //roleId!:number;
  ngOnInit(): void {
    this.role.getRole().subscribe(

      (secteurs: any[]) => {
        this.sectors = secteurs;
        console.log(this.sectors)
;      },
      (error: any) => {
        console.log(error);
      }
    );
    this.signUpForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      login: ['', Validators.required],
      mdp: ['', Validators.required],
      rolesUtilisateurs: [],
      client: false,  // Initialize it with the default value false

    });
  
    this.api.getUsers().subscribe((result: Utilisateur[]) => {
      this.heroes = result;
      console.log('Heroes array length:', this.heroes.length); // Debug statement
    });
  }
  /*toggleRoleStatus(hero:Utilisateur) {
    hero.isDisabled = !hero.isDisabled;
  }*/
  toggleRoleStatus(hero: any) {
    hero.isDisbles = !hero.isDisbles;
    
    if (hero && hero.id !== undefined) {
      const confirmation = window.confirm('Êtes-vous sûr de vouloir desactiver ce utilisateur ?');
  
      if (confirmation) {
        this.superHeroService.deleteRole(hero.id).subscribe(() => {
          this.toast.success({detail:"SUCCESS",summary:"utilisateur a bien été desactiver",duration:5000})
          this.heroes = this.heroes.filter(h => h.id !== hero.id);
        });
      }
    } else {
      console.error('utilisateur invalide ou client.id non défini');
    }
    
  }
  roleUtilisateur: RoleUtilisateur = {
    roleId: 0,
    utilisateurId: 0,
    utilisateur: '',
    role: new Role
  };
updateHeroList(heroes:Utilisateur[]){
  this.heroes=heroes;
  alert("role a bien été modifier");
  this.ngOnInit();
}

initNewHero(){
}
editHero(hero: any) {
  this.hero = { ...hero }; // Set the form data to the existing role's data
  // Open the "editRoleModal" by targeting its ID
  document.getElementById('editRoleModal')?.classList.add('show');
}
// Modifier un héros existant
updateHero(hero: Utilisateur) {
  if (hero && hero.id) {
    this.superHeroService.updateHero(hero.id,hero).subscribe((heroes) => {
      this.heroesUpdate.emit(heroes);
      this.toast.success({detail:"SUCCESS",summary:"Utilisateur a bien été modifié",duration:5000})

    
      this.ngOnInit();

    });
  } else {
    console.error("Invalid hero object or Utilisateur.id is undefined.");
  }
}
hideShowPass(){
  this.isText = !this.isText;
  this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
  this.isText ? this.type = 'text' : this.type = 'password'
}  
selectedRoleId: number[] = [];
selectedRoleIds: number[] = [];

clientId!:string;
onSignup() {
  if (this.signUpForm.valid) {
 
  // Extract the selected role from the dropdown
  const selectedRole = this.selectedRoleId;
console.log("le role choisit est :",selectedRole);

  this.auth.signUp(this.signUpForm.value)
    .subscribe({
      next:(res=>{
        alert(res.message);
        this.signUpForm.reset();
      }),
      error:(err=>{
        this.toast.success({detail:"SUCCESS",summary:"Utilisateurs a bien été créé",duration:5000})

 
            this.signUpForm.reset();
        this.ngOnInit();

      })
    })
    console.log(this.signUpForm.value)
  } else {
    ValidateForm.validateAllFormFileds(this.signUpForm);

  }
}
loadHeroes() {
  this.superHeroService.getRole().subscribe((result: Utilisateur[]) => {
    this.heroes = result;
  });
}

deleteRole(hero: Utilisateur) {
  if (hero && hero.id !== undefined) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir desactiver cette utilisateur ?');

    if (confirmation) {
    this.superHeroService.deleteRole(hero.id).subscribe(() => {
      // After successful deletion, remove the hero from the local array
      this.ngOnInit();
      this.toast.success({detail:"SUCCESS",summary:"Utilisateur a bien été supprimé",duration:3000})
      this.heroes = this.heroes.filter(h => h.id !== hero.id);
    });
  }
   else {
    console.error('Invalid hero or hero.id is undefined');
  }
}
}
hasData(): boolean {
  return this.heroes.length > 0;
}
closeForm() {
  this.heroToEdit = undefined;
}
get paginatedItems(): Utilisateur[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.heroes.slice(startIndex, endIndex);
}


get totalPages(): number {
  console.log(this.heroes.length);
  return Math.ceil(this.heroes.length / this.itemsPerPage);
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

