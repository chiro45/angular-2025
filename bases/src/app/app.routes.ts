import { Routes } from '@angular/router';
import { CountePageComponent } from './pages/counter/counter-page.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';
import { DragonBallPage } from './pages/dragonball/dragonball-page.component';
import { DragonBallSuperPage } from './pages/dragonball-super/dragonball-super-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CountePageComponent,
  },
  {
    path: 'hero',
    component: HeroPageComponent,
  },
  {
    path: 'dragonball',
    component: DragonBallPage,
  },
  {
    path: 'dragonball-super',
    component: DragonBallSuperPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
