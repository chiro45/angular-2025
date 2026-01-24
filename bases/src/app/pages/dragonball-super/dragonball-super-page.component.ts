//import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { CharacterList } from '../../components/dragonball/character-list/character-list.component';
import { CharacterAdd } from '../../components/dragonball/character-add/character-add.component';
import { DragonBallService } from '../../services/dragonball.service';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  templateUrl: './dragonball-super-page.component.html',
  imports: [CharacterList, CharacterList, CharacterAdd],
})
export class DragonBallSuperPage {
  //manera tradicional de inyeccion de dependecnia
  // constructor(public dragonBallService: DragonBallService) {}

  // addCharacter(newCharacter:Character) {
  //   this.dragonBallService.addCharacter(newCharacter);
  // }

  public dragonBallService = inject(DragonBallService)

  


}
