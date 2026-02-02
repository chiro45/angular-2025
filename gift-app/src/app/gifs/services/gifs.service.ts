import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/enviroment';
import {map, tap} from 'rxjs'
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({ providedIn: 'root' })
export class GifService {
  constructor() {
    this.loadTrendingGifs();
    this.loadSearchHistory();
  }

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  private http = inject(HttpClient);
  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApikey,
          limit: 20,
        },
      })
      .subscribe((res) => {
        const gifs = GifMapper.mapGiphyItemToArray(res.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
      });
  }

  private loadSearchHistory() {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      this.searchHistory.set(JSON.parse(history));
    }
  }

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
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemToArray(items)),

        // Historial
        tap((items) => {
          this.searchHistory.update((history) => {
            const newHistory = { ...history, [query.toLowerCase()]: items };
            localStorage.setItem('searchHistory', JSON.stringify(newHistory));
            return newHistory;
          });
        }),
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
