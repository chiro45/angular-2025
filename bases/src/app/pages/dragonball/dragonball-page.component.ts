//import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Character } from '../../interfaces/character.interface';


@Component({
  templateUrl: './dragonball-page.component.html',
  imports: [
    //  NgClass
  ],
})
export class DragonBallPage {
  characters = signal<Character[]>([
    {
      id: 1,
      name: 'Goku',
      power: 9000,
    },
    {
      id: 1,
      name: 'Vegeta',
      power: 8000,
    },
    {
      id: 3,
      name: 'Yamcha',
      power: 500,
    },
    {
      id: 4,
      name: 'Piccolo',
      power: 3000,
    },
  ]);

  powerClasess = computed(() => {
    return {
      'text-danger': true,
    };
  });

  name = signal('');
  power = signal(0);

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) return;
    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    };
    //no es lo mejor en signals
    //this.characters().push(newCharacter)
    //recomendado
    this.characters.update((list) => [...list, newCharacter]);
    this.resetFields();
  }

  resetFields() {
    this.power.set(0);
    this.name.set('');
  }
}
