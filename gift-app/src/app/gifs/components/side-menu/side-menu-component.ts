import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GifsSideMenuHeader } from "./side-menu-header/side-menu-header.component";
import { GifsSideMenuOptionsComponent } from "./side-menu-options/side-menu-options.component";

@Component({
  selector: 'app-gift-side-menu',
  imports: [GifsSideMenuHeader, GifsSideMenuOptionsComponent],
  templateUrl: './side-menu-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftSideMenuComponent {
 }
