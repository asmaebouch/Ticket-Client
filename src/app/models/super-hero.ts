export class SuperHero{
    id?:number;
    nomClient="";
    contratClient="";
    numeroContratMaintenance="";
    isDisabled!:boolean;
    
   // IsDisabled!:boolean; 

}export class Role{
    id?:number;
    nom="";
    rolesUtilisateurs: string[] | undefined;
    isDisabled!:boolean;
   
}
export class Plateforme{
  id?:number;
  nomPlateforme="";
  isDisabled!:boolean;
  static id: number;
 
}
export class Qualification{
  id?:number;
  nomPlateforme="";
  isDisabled!:boolean;
 
}
export class Etape{
  id?:number;
  nomEtape="";
  isDisabled!:boolean;
 
}
export class ServiceCateg{
  id?:number;
  nomService="";
  isDisabled!:boolean;
 
}
 export class Affectation{
  id?:number;
  expediteur="";
  etat="";
  dateInitiation="";
  dateAction="";
  statut_procesus="";
  responsable="";
  qualification="";
  initiateur="";
  service=""
 
}
export class Ticket2{
  id2?:number;
  initiateur="";
  reference="";
  date="";
  urgence="";
  intitule_reclamation="";
  reclamation="";
  isDisabled!:boolean;
  plateformeId!: number;
  plateforme="";
  serviceId!:number;
  qualificationId!:number;
  qualification="";
  service="";
  imgPath="";
  typedocument="";
  dateAjouter="";
  statut="";
  datePrevisonnelle="";
  type="";
  userId!:number;
  utilisateur="";
  utilisateurId!:number;
  solverUserId!:number;
  solverUser="";
  user="";
}
// user.model.ts
export interface Utilisateur {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    mdp: string;
    login: string;
    token: string;
    rolesUtilisateurs: RoleUtilisateur[];
    client:string;
    isDisbles:boolean;

  }
  
  export interface RoleUtilisateur {
    utilisateurId: number;
    utilisateur: string;
    roleId: number;
    role: Role;
  }
  
  
  
/*
export class Utilisateur {
    id: number | undefined;
    nom: string | undefined;
    prenom: string | undefined;
    email: string | undefined;
    mdp: string | undefined;
    roleId: number | undefined=0;
    travailleChezLeClient: boolean | undefined;
  }*/
  // Modèle Utilisateur correspondant au modèle UtilisateurDto


  