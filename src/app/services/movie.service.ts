import { Injectable, computed, signal } from '@angular/core';
import { MOCK_MOVIES, Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly _movies = signal<Movie[]>(MOCK_MOVIES);
  private readonly _searchQuery = signal<string>('');
  private readonly _selectedGenre = signal<string>('Todos');
  private readonly _selectedMovie = signal<Movie | null>(null);

  readonly movies = this._movies.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();
  readonly selectedGenre = this._selectedGenre.asReadonly();
  readonly selectedMovie = this._selectedMovie.asReadonly();

  readonly genres = computed(() => [
    'Todos',
    ...Array.from(new Set(this._movies().map((m) => m.genre))).sort(),
  ]);

  readonly filteredMovies = computed(() => {
    const q = this._searchQuery().trim().toLowerCase();
    const genre = this._selectedGenre();

    return this._movies().filter((m) => {
      const matchesGenre = genre === 'Todos' || m.genre === genre;
      const matchesQuery =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q);
      return matchesGenre && matchesQuery;
    });
  });

  readonly featuredMovie = computed(() => this._movies()[0] || null);

  setSearchQuery(query: string): void {
    this._searchQuery.set(query);
  }

  setSelectedGenre(genre: string): void {
    this._selectedGenre.set(genre);
  }

  selectMovie(movie: Movie | null): void {
    this._selectedMovie.set(movie);
  }
}
