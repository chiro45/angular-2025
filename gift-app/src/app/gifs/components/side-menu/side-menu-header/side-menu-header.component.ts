import { Component } from '@angular/core';
import { environment } from '@environments/enviroment';

@Component({
  selector: 'app-gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
})
export class GifsSideMenuHeader {

  envs = environment


}
