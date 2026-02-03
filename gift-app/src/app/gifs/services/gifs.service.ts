import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/enviroment';
import { map, tap } from 'rxjs';

import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({ providedIn: 'root' })
export class GifService {
  constructor() {
    // Al iniciar el servicio:
    // 1. cargamos gifs en tendencia
    // 2. restauramos el historial desde localStorage
    this.loadTrendingGifs();
    this.loadSearchHistory();
  }

  // Estado reactivo con Signals
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);

  trendingGifGroup = computed<Gif[][]>(()=>{
    const  groups = []

    for (let index = 0; index < this.trendingGifs().length; index+=3) {
      groups.push(this.trendingGifs().slice(index , index+3))

    }

    return groups
  })

  // Historial de búsquedas:
  // clave = query, valor = array de gifs
  searchHistory = signal<Record<string, Gif[]>>({});

  // Claves del historial (para iterar en UI)
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  // Inyección moderna de HttpClient
  private http = inject(HttpClient);

  // ===============================
  // Gifs en tendencia
  // ===============================
  private trendingPage = signal(0)
  loadTrendingGifs() {

    if(this.trendingGifsLoading()) return
    this.trendingGifsLoading.set(true)
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApikey,
          limit: 20,
          offset: this.trendingPage() *20
        },
      })
      .subscribe((res) => {
        // Mapeamos la respuesta de Giphy a nuestro modelo Gif
        const gifs = GifMapper.mapGiphyItemToArray(res.data);
        this.trendingPage.update((prev)=> prev+1)
        // Actualizamos el estado
        this.trendingGifs.update((prev)=> [...prev, ...gifs]);
        this.trendingGifsLoading.set(false);
      });
  }

  // ===============================
  // Cargar historial desde localStorage
  // ===============================
  private loadSearchHistory() {
    const history = localStorage.getItem('searchHistory');

    if (history) {
      this.searchHistory.set(JSON.parse(history));
    }
  }

  // ===============================
  // Buscar gifs por texto
  // ===============================
  searchGifs(query: string) {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApikey,
          limit: 20,
          q: query,
        },
      })
      .pipe(
        // Extraemos solo el array de resultados
        map(({ data }) => data),

        // Convertimos al modelo interno Gif
        map((items) => GifMapper.mapGiphyItemToArray(items)),

        // Guardamos en historial
        tap((items) => {
          this.searchHistory.update((history) => {
            const newHistory = {
              ...history,
              [query.toLowerCase()]: items,
            };

            // Persistimos en localStorage
            localStorage.setItem('searchHistory', JSON.stringify(newHistory));

            return newHistory;
          });
        }),
      );
  }

  // ===============================
  // Obtener gifs del historial
  // ===============================
  getHistoryGifs(query: string): Gif[] {
    // Si no existe la key, devolvemos array vacío
    return this.searchHistory()[query] ?? [];
  }
}
