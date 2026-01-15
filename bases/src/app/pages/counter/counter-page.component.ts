import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountePageComponent {
  counter = 10;

  counterSignal = signal(10);

  constructor() {
    // setInterval(() => {
    //   //this.counter +=1
    //   this.counterSignal.update((value) => value + 1);
    //   console.log('Tick');
    // }, 2000);
  }

  increaseBy() {
    this.counter += 1;
    this.counterSignal.update((value) => value + 1);
  }
  decreaseCounter() {
    this.counter -= 1;
    this.counterSignal.update((value) => value - 1);
  }
  resetCounter() {
    this.counter = 0;
    this.counterSignal.set(0);
  }
}
