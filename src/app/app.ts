import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from './services/movie.service';
import { Movie } from './models/movie.model';
import { IconComponent } from './components/icon/icon.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieModalComponent } from './components/movie-modal/movie-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IconComponent,
    MovieCardComponent,
    MovieModalComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly movieService = inject(MovieService);

  readonly movies = this.movieService.movies;
  readonly filteredMovies = this.movieService.filteredMovies;
  readonly genres = this.movieService.genres;
  readonly selectedGenre = this.movieService.selectedGenre;
  readonly searchQuery = this.movieService.searchQuery;
  readonly featuredMovie = this.movieService.featuredMovie;
  readonly selectedMovie = this.movieService.selectedMovie;

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.movieService.setSearchQuery(input.value);
  }

  onSelectGenre(genre: string): void {
    this.movieService.setSelectedGenre(genre);
  }

  onSelectMovie(movie: Movie): void {
    this.movieService.selectMovie(movie);
  }

  onCloseModal(): void {
    this.movieService.selectMovie(null);
  }
}
