import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { GiftListComponent } from '../../components/gift-list/gift-list.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  // Selector del componente
  selector: 'app-gif-history',

  // Componentes standalone que se usan en el template
  imports: [GiftListComponent],

  // Template HTML asociado
  templateUrl: './gif-history.component.html',

  // OnPush: el componente solo se vuelve a renderizar
  // cuando cambian señales, inputs o eventos explícitos
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistoryComponent {
  // Inyección del servicio de gifs usando inject (Angular moderno)
  gifService = inject(GifService);

  // Convertimos los params de la ruta en una SIGNAL
  // params['query'] obtiene el valor del parámetro dinámico
  // Ej: /history/cats → query = 'cats'
  query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])));

  // Computed signal:
  // cada vez que cambia `query`,
  // se recalcula la lista de gifs desde el servicio
  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
