import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SuperHero } from '../models/super-hero';
import { SuperHeroService } from '../services/super-hero.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent  implements OnInit{
  @Input() hero: any; // Remplacez 'any' par le type de données attendu
@Output() heroesUpdate=new EventEmitter<SuperHero[]>();
constructor(private superHeroService:SuperHeroService){}



  ngOnInit(): void {
  }
  updateHero(hero:SuperHero){
this.superHeroService.updateHero(hero).subscribe((heroes)=>this.heroesUpdate.emit(heroes));
  }
  deleteHero(hero: any) {
    this.superHeroService.deleteHero(hero.id).subscribe(() => {
      // Suppression réussie, émettez l'événement avec le héros supprimé
      this.deleteHero(hero);
    }, (error) => {
      // Gérer les erreurs si nécessaire
      console.error('Erreur lors de la suppression du héros :', error);
    });
  }
  
  createHero(hero:SuperHero){
    this.superHeroService.createHero(hero).subscribe((heroes)=>this.heroesUpdate.emit(heroes));

  }
}
