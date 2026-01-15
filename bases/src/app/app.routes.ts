import { Routes } from '@angular/router';
import { CountePageComponent } from './pages/counter/counter-page.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CountePageComponent,
  },
  {
    path: 'hero',
    component: HeroPageComponent,
  },
];
