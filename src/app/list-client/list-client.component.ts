import { Component, EventEmitter, Output } from '@angular/core';
import { SuperHeroService } from '../services/super-hero.service';
import { SuperHero } from '../models/super-hero';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent {
  heroes:SuperHero[]=[];
  heroToEdit?:SuperHero;
  @Output() heroesUpdate=new EventEmitter<SuperHero[]>();

  constructor(private superHeroService:SuperHeroService){}
    ngOnInit():void{
this.superHeroService.getSupperHeroes().
subscribe((result:SuperHero[])=>(this.heroes=result));
}
updateHeroList(heroes:SuperHero[]){
  this.heroes=heroes;
}

deleteHero(hero: any) {
  
    // L'ID du héros est défini, vous pouvez procéder à la suppression
    this.superHeroService.deleteHero(hero.id).subscribe(
      (resp) => {
        // Suppression réussie, mettez à jour la liste des héros
        console.log(resp);
        alert("Projet a bien été supprimé");
      },
      (err)=> console.log(err)
    );
 
}



initNewHero(){
  this.heroToEdit=new SuperHero();
}
editHero(hero:SuperHero){
  this.heroToEdit=hero;
}

}
