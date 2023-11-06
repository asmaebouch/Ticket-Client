import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientComponent } from './list-client/list-client.component';
import { ListRoleComponent } from './list-role/list-role.component';
import { ListUtilisateurComponent } from './list-utilisateur/list-utilisateur.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketComponent } from './ticket/ticket.component';
import { AffectationComponent } from './affectation/affectation.component';
import { HeaderComponent } from './header/header.component';
import { RechercheComponent } from './recherche/recherche.component';
import { ChanagerMdpComponent } from './chanager-mdp/chanager-mdp.component';
import { PLateformeComponent } from './plateforme/plateforme.component';
import { ServiceCategoriesComponent } from './service-categories/service-categories.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { QualificationComponent } from './qualification/qualification.component';
import { EtapeComponent } from './etape/etape.component';
const routes: Routes = [
    {path:"client",component:ListClientComponent,canActivate:[AuthGuard]},
    {path:"role",component:ListRoleComponent,canActivate:[AuthGuard]},
    {path:"utilisateur",component:ListUtilisateurComponent,canActivate:[AuthGuard]},
    {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
    {path:"header",component:HeaderComponent},
    {path:"recherche",component:RechercheComponent,canActivate:[AuthGuard]},
    {path:"changermdp",component:ChanagerMdpComponent,canActivate:[AuthGuard]},
    {path:"plateform",component:PLateformeComponent,canActivate:[AuthGuard]},
    {path:"service",component:ServiceCategoriesComponent,canActivate:[AuthGuard]},
    {path:"ticket",component:TicketComponent,canActivate:[AuthGuard]},
    {path:"affectation",component:AffectationComponent,canActivate:[AuthGuard]},
    {path:"reclamation",component:ReclamationComponent,canActivate:[AuthGuard]},
    {path:"qualification",component:QualificationComponent,canActivate:[AuthGuard]},
    {path:"etape",component:EtapeComponent,canActivate:[AuthGuard]},

    
    {path:'', pathMatch:'full',component:LoginComponent},
   //{path:"login",component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], providers: [
    // ...
    { provide: LOCALE_ID, useValue: 'fr-FR' }, // Définissez la langue par défaut sur le français
  ],
})
export class AppRoutingModule {
  constructor() {
    // Enregistrez la localisation française
    registerLocaleData(localeFr, 'fr');
  }
 }
