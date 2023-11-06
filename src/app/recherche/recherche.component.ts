import { Component, Input } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Affectation, Ticket2 } from '../models/super-hero';
import { RechercheService } from '../recherche.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent {
  @Input() hero: any | undefined; // Remplacez 'any' par le type de données attendu
  public signUpForm!: FormGroup;
  searchResults: any[] = []; // Initialize it as an empty array
  loginForm!: FormGroup ;
  heroes:Affectation[]=[];

  constructor(private rcherche:RechercheService,private toast:NgToastService,private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      etat: ['', Validators.required],
      // Other form controls and their validators here
    });
  
    // Initialisation vide de heroes
    this.heroes = [];
  }
  
  RechercheAffectation(hero: any) {
    if (hero) {
      this.rcherche.Recherche(hero).subscribe(
        (newHero: any) => {
          console.log(newHero);
          this.searchResults = newHero; // Set search results
          this.heroes = newHero; // Mettez à jour heroes avec les résultats de la recherche
        },
        (error) => {
          console.error("Recherche search failed:", error);
          alert("Erreur lors de la Recherche du Recherche. Veuillez vérifier les données.");
        }
      );
    } else {
      alert("Nom du Recherche ne peut pas être vide.");
    }
  }
  



}
