import { Component, input, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
})
export class CharacterAdd {
  name = signal('');
  power = signal(0);

  newCharacter = output<Character>();
  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) return;
    const newCharacter: Character = {
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power(),
    };

    this.newCharacter.emit(newCharacter);
    this.resetFields();
  }

  resetFields() {
    this.power.set(0);
    this.name.set('');
  }
}
