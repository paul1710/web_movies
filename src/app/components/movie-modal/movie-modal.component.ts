import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  input,
  output,
} from '@angular/core';
import { Movie } from '../../models/movie.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-movie-modal',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm animate-fade-in"
      (click)="close.emit()"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="'Detalles de ' + movie().title"
    >
      <div
        class="relative w-full max-w-2xl overflow-hidden rounded-xl bg-surface-raised poster-shadow animate-modal-in border border-border"
        (click)="$event.stopPropagation()"
      >
        <!-- Modal Hero Header -->
        <div class="relative aspect-video w-full overflow-hidden bg-surface">
          <img
            [src]="movie().poster"
            [alt]="'Escena de ' + movie().title"
            class="h-full w-full object-cover object-top"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-surface-raised via-surface-raised/40 to-transparent"
          ></div>
          <button
            type="button"
            (click)="close.emit()"
            class="absolute right-3 top-3 rounded-full bg-background/70 p-2 text-foreground transition-colors hover:bg-background cursor-pointer focus:outline-none"
            aria-label="Cerrar"
          >
            <app-icon name="x" class="h-4 w-4" />
          </button>
          <div class="absolute bottom-4 left-6 right-6">
            <h2 class="text-2xl font-bold text-foreground sm:text-3xl">
              {{ movie().title }}
            </h2>
          </div>
        </div>

        <!-- Modal Body Content -->
        <div class="space-y-4 p-6">
          <div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span class="inline-flex items-center gap-1 font-semibold text-gold">
              <app-icon name="star" class="h-4 w-4 fill-current text-gold" />
              {{ movie().rating.toFixed(1) }}
            </span>
            <span>{{ movie().year }}</span>
            <span class="inline-flex items-center gap-1">
              <app-icon name="clock" class="h-4 w-4" />
              {{ movie().duration }}
            </span>
            <span
              class="rounded border border-border px-2 py-0.5 text-xs uppercase tracking-wide"
            >
              {{ movie().genre }}
            </span>
          </div>

          <div class="flex gap-3">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:bg-brand/85 cursor-pointer shadow-lg shadow-brand/20 active:scale-95"
            >
              <app-icon name="play" class="h-4 w-4 fill-current text-brand-foreground" />
              Reproducir
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-all hover:bg-accent cursor-pointer active:scale-95"
            >
              <app-icon name="plus" class="h-4 w-4" />
              Mi lista
            </button>
          </div>

          <p class="text-sm leading-relaxed text-foreground/90">
            {{ movie().synopsis }}
          </p>

          <div class="space-y-1 text-sm text-muted-foreground border-t border-border pt-4">
            <p>
              <span class="text-foreground/70 font-medium">Dirección:</span>
              {{ movie().director }}
            </p>
            <p>
              <span class="text-foreground/70 font-medium">Reparto:</span>
              {{ movie().cast.join(', ') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MovieModalComponent implements OnInit, OnDestroy {
  movie = input.required<Movie>();
  close = output<void>();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close.emit();
    }
  }

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}
