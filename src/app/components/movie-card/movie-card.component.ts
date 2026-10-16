import { Component, input, output } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [IconComponent],
  template: `
    <button
      type="button"
      (click)="select.emit(movie())"
      class="group relative block w-full overflow-hidden rounded-lg bg-surface text-left poster-shadow transition-transform duration-300 hover:z-10 hover:scale-105 focus-visible:outline-2 focus-visible:outline-ring cursor-pointer"
      [attr.aria-label]="'Ver detalles de ' + movie().title"
    >
      <div class="aspect-[2/3] w-full overflow-hidden bg-secondary">
        <img
          [src]="movie().poster"
          [alt]="'Póster de ' + movie().title"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div
        class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <h3 class="text-sm font-semibold text-foreground">{{ movie().title }}</h3>
        <div class="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span class="inline-flex items-center gap-1 text-gold">
            <app-icon name="star" class="h-3 w-3 fill-current text-gold" />
            {{ movie().rating.toFixed(1) }}
          </span>
          <span>{{ movie().year }}</span>
          <span
            class="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide"
          >
            {{ movie().genre }}
          </span>
        </div>
      </div>
    </button>
  `,
})
export class MovieCardComponent {
  movie = input.required<Movie>();
  select = output<Movie>();
}
