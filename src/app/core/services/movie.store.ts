import { Injectable, computed, effect, signal } from '@angular/core';
import {
  CatalogStats,
  Movie,
  MovieFilterState,
  MovieReview,
  SortOption,
  TabFilter,
  WatchStatus,
} from '../models/movie.model';
import { INITIAL_MOVIES_MOCK } from '../data/movies.mock';

const STORAGE_KEY = 'film_index_catalog_v1';

@Injectable({
  providedIn: 'root',
})
export class MovieStore {
  // Estado principal de películas
  private readonly _movies = signal<Movie[]>(this.loadInitialMovies());

  // Estado de filtros
  private readonly _filters = signal<MovieFilterState>({
    searchQuery: '',
    statusTab: 'ALL',
    selectedGenre: 'ALL',
    sortBy: 'RECENT_ADDED',
  });

  // Película seleccionada para modal de detalle
  private readonly _selectedMovieId = signal<string | null>(null);

  constructor() {
    // Sincronización automática con LocalStorage en cada cambio de las películas
    effect(() => {
      const currentMovies = this._movies();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentMovies));
      } catch (err) {
        console.error('Error al guardar películas en LocalStorage:', err);
      }
    });
  }

  // --- Selectores y Computed Signals ---

  public readonly movies = this._movies.asReadonly();
  public readonly filters = this._filters.asReadonly();
  public readonly selectedMovieId = this._selectedMovieId.asReadonly();

  public readonly selectedMovie = computed(() => {
    const id = this._selectedMovieId();
    if (!id) return null;
    return this._movies().find((m) => m.id === id) ?? null;
  });

  // Lista única de géneros presentes en el catálogo
  public readonly availableGenres = computed(() => {
    const genresSet = new Set<string>();
    for (const movie of this._movies()) {
      for (const genre of movie.genres) {
        genresSet.add(genre);
      }
    }
    return Array.from(genresSet).sort();
  });

  // Estadísticas del catálogo
  public readonly stats = computed<CatalogStats>(() => {
    const list = this._movies();
    const total = list.length;
    const watchedList = list.filter((m) => m.status === 'VISTA');
    const watched = watchedList.length;
    const pending = list.filter((m) => m.status === 'POR_VER').length;
    const favorites = list.filter((m) => m.isFavorite).length;

    const watchedPercentage = total > 0 ? Math.round((watched / total) * 100) : 0;
    const totalWatchedMinutes = watchedList.reduce(
      (acc, curr) => acc + (curr.durationMinutes || 0),
      0
    );
    const totalWatchedHours = Math.round((totalWatchedMinutes / 60) * 10) / 10;

    return {
      total,
      watched,
      pending,
      favorites,
      watchedPercentage,
      totalWatchedHours,
    };
  });

  // Películas filtradas y ordenadas en tiempo real
  public readonly filteredMovies = computed(() => {
    const { searchQuery, statusTab, selectedGenre, sortBy } = this._filters();
    let result = [...this._movies()];

    // 1. Filtro por Solapa (Tab)
    if (statusTab === 'VISTA') {
      result = result.filter((m) => m.status === 'VISTA');
    } else if (statusTab === 'POR_VER') {
      result = result.filter((m) => m.status === 'POR_VER');
    } else if (statusTab === 'FAVORITAS') {
      result = result.filter((m) => m.isFavorite);
    }

    // 2. Filtro por Género
    if (selectedGenre && selectedGenre !== 'ALL') {
      result = result.filter((m) => m.genres.includes(selectedGenre));
    }

    // 3. Filtro por Buscador de texto (Título, Director o Sinopsis)
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.director.toLowerCase().includes(query) ||
          m.catalogNumber.toLowerCase().includes(query) ||
          (m.originalTitle && m.originalTitle.toLowerCase().includes(query))
      );
    }

    // 4. Ordenamiento
    result.sort((a, b) => {
      switch (sortBy) {
        case 'TITLE_ASC':
          return a.title.localeCompare(b.title);
        case 'TITLE_DESC':
          return b.title.localeCompare(a.title);
        case 'YEAR_DESC':
          return b.year - a.year;
        case 'YEAR_ASC':
          return a.year - b.year;
        case 'RATING_DESC': {
          const ratingA = a.review?.rating ?? a.imdbScore ?? 0;
          const ratingB = b.review?.rating ?? b.imdbScore ?? 0;
          return ratingB - ratingA;
        }
        case 'RECENT_ADDED':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  });

  // --- Mutadores de Estado (Acciones) ---

  public toggleWatchStatus(id: string): void {
    this._movies.update((list) =>
      list.map((m) => {
        if (m.id !== id) return m;
        const newStatus: WatchStatus = m.status === 'VISTA' ? 'POR_VER' : 'VISTA';
        return {
          ...m,
          status: newStatus,
          review:
            newStatus === 'VISTA' && !m.review
              ? { rating: 5, watchedDate: new Date().toISOString().split('T')[0] }
              : m.review,
        };
      })
    );
  }

  public toggleFavorite(id: string): void {
    this._movies.update((list) =>
      list.map((m) => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m))
    );
  }

  public updateReview(id: string, review: MovieReview): void {
    this._movies.update((list) =>
      list.map((m) => (m.id === id ? { ...m, status: 'VISTA', review } : m))
    );
  }

  public addMovie(movie: Omit<Movie, 'id' | 'catalogNumber' | 'createdAt'>): void {
    const nextIndex = this._movies().length + 1;
    const catalogNumber = `#FILM-${String(nextIndex).padStart(3, '0')}`;
    const newMovie: Movie = {
      ...movie,
      id: `m-${Date.now()}`,
      catalogNumber,
      createdAt: new Date().toISOString(),
    };
    this._movies.update((list) => [newMovie, ...list]);
  }

  public deleteMovie(id: string): void {
    this._movies.update((list) => list.filter((m) => m.id !== id));
    if (this._selectedMovieId() === id) {
      this._selectedMovieId.set(null);
    }
  }

  // --- Métodos de Filtro y Selección ---

  public setSearchQuery(query: string): void {
    this._filters.update((f) => ({ ...f, searchQuery: query }));
  }

  public setStatusTab(tab: TabFilter): void {
    this._filters.update((f) => ({ ...f, statusTab: tab }));
  }

  public setSelectedGenre(genre: string): void {
    this._filters.update((f) => ({ ...f, selectedGenre: genre }));
  }

  public setSortBy(sort: SortOption): void {
    this._filters.update((f) => ({ ...f, sortBy: sort }));
  }

  public openMovieDetail(id: string): void {
    this._selectedMovieId.set(id);
  }

  public closeMovieDetail(): void {
    this._selectedMovieId.set(null);
  }

  // Respaldo JSON
  public exportData(): string {
    return JSON.stringify(this._movies(), null, 2);
  }

  public importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString) as Movie[];
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
        this._movies.set(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public resetToDefaultMock(): void {
    this._movies.set(INITIAL_MOVIES_MOCK);
  }

  private loadInitialMovies(): Movie[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignorar errores en SSR o entornos restringidos
    }
    return INITIAL_MOVIES_MOCK;
  }
}
