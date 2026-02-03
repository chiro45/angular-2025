import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';



@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent  implements AfterViewInit{
  gifService = inject(GifService);
  scrollState= inject(ScrollStateService)

  scrollDivRef = viewChild<ElementRef>('groupDiv')

  ngAfterViewInit(): void {
    const scrollDiv: HTMLDivElement = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollState.trendingScollState()
  }

  onScroll(){
    const scrollDiv: HTMLDivElement = this.scrollDivRef()?.nativeElement
    if(!scrollDiv) return

    const clienHeight = scrollDiv.clientHeight
    const scrollTop = scrollDiv.scrollTop
    const scrollHeight = scrollDiv.scrollHeight
    const isABottom = scrollTop + 300  + clienHeight >= scrollHeight
    this.scrollState.trendingScollState.set(scrollTop)

    if(isABottom){
      this.gifService.loadTrendingGifs()
    }






  }
}
