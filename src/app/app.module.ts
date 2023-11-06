import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListClientComponent } from './list-client/list-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListRoleComponent } from './list-role/list-role.component';
import { ListUtilisateurComponent } from './list-utilisateur/list-utilisateur.component';
import { FormulaireRoleComponent } from './formulaire-role/formulaire-role.component';
import { FormulaireUtilisateurComponent } from './formulaire-utilisateur/formulaire-utilisateur.component';
import { LoginComponent } from './login/login.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HeaderComponent } from './header/header.component';
import { TicketComponent } from './ticket/ticket.component';
import { AffectationComponent } from './affectation/affectation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfilComponent } from './profil/profil.component';
import { RechercheComponent } from './recherche/recherche.component';
import { ChanagerMdpComponent } from './chanager-mdp/chanager-mdp.component';
import { PLateformeComponent } from './plateforme/plateforme.component';
import { ServiceCategoriesComponent } from './service-categories/service-categories.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { QualificationComponent } from './qualification/qualification.component';
import { EtapeComponent } from './etape/etape.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListClientComponent,
    EditClientComponent,
    ListRoleComponent,
    ListUtilisateurComponent,
    FormulaireRoleComponent,
    FormulaireUtilisateurComponent,
    LoginComponent,
    HeaderComponent,
    TicketComponent,
    AffectationComponent,
    ProfilComponent,
    RechercheComponent,
    ChanagerMdpComponent,
    PLateformeComponent,
    ServiceCategoriesComponent,
    UploadfileComponent,
    ReclamationComponent,
    QualificationComponent,
    EtapeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
    NgbModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
