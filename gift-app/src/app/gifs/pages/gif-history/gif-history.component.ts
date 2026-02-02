import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GiftListComponent } from "../../components/gift-list/gift-list.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gif-history',
  imports: [GiftListComponent],
  templateUrl: './gif-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistoryComponent {
  gifService = inject(GifService);

  query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])));

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
