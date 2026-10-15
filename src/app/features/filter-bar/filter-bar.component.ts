import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieStore } from '../../core/services/movie.store';
import { SortOption } from '../../core/models/movie.model';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="w-full bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 shadow-xl text-zinc-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
    >
      <!-- 1. Buscador en Tiempo Real -->
      <div class="relative flex-1 min-w-[260px]">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          [value]="filters().searchQuery"
          (input)="onSearchInput($event)"
          placeholder="Buscar por título, director o código #FILM..."
          class="w-full pl-10 pr-9 py-2.5 bg-zinc-800/80 border border-zinc-700/80 rounded-xl text-sm placeholder-zinc-500 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
        />
        @if (filters().searchQuery) {
          <button
            type="button"
            (click)="clearSearch()"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-200"
            title="Limpiar búsqueda"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        }
      </div>

      <!-- 2. Filtro de Género & Ordenación -->
      <div class="flex flex-wrap items-center gap-3">
        <!-- Selector de Género -->
        <div class="flex items-center gap-2">
          <label class="text-xs text-zinc-400 uppercase tracking-wider font-medium hidden sm:inline-block">Género:</label>
          <select
            [value]="filters().selectedGenre"
            (change)="onGenreSelect($event)"
            class="bg-zinc-800/80 border border-zinc-700/80 text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
          >
            <option value="ALL">Todos los Géneros</option>
            @for (genre of availableGenres(); track genre) {
              <option [value]="genre">{{ genre }}</option>
            }
          </select>
        </div>

        <!-- Selector de Orden -->
        <div class="flex items-center gap-2">
          <label class="text-xs text-zinc-400 uppercase tracking-wider font-medium hidden sm:inline-block">Orden:</label>
          <select
            [value]="filters().sortBy"
            (change)="onSortSelect($event)"
            class="bg-zinc-800/80 border border-zinc-700/80 text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
          >
            <option value="RECENT_ADDED">Añadidas recientemente</option>
            <option value="RATING_DESC">Mayor calificación</option>
            <option value="YEAR_DESC">Año: Más recientes</option>
            <option value="YEAR_ASC">Año: Más antiguas</option>
            <option value="TITLE_ASC">Título (A - Z)</option>
            <option value="TITLE_DESC">Título (Z - A)</option>
          </select>
        </div>

        <!-- 3. Acciones de Persistencia (Export/Import JSON) -->
        <div class="flex items-center gap-1.5 ml-auto sm:ml-0 border-l border-zinc-800 pl-3">
          <!-- Botón Exportar JSON -->
          <button
            type="button"
            (click)="exportBackup()"
            class="p-2 text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/80 rounded-xl transition-all"
            title="Exportar copia de seguridad (JSON)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>

          <!-- Botón Importar JSON -->
          <button
            type="button"
            (click)="triggerFileInput()"
            class="p-2 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/80 rounded-xl transition-all"
            title="Restaurar fichero desde JSON"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </button>

          <!-- Input oculto de archivo para restaurar -->
          <input
            #fileInput
            type="file"
            accept=".json"
            (change)="onFileSelected($event)"
            class="hidden"
          />

          <!-- Botón Reiniciar a Mock Inicial -->
          <button
            type="button"
            (click)="resetToDefaultMock()"
            class="p-2 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800/80 rounded-xl transition-all"
            title="Restablecer películas de ejemplo iniciales"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Feedback Banner Notificación Flotante -->
    @if (notificationMessage()) {
      <div
        class="mt-2 text-xs py-2 px-3 rounded-lg flex items-center justify-between"
        [ngClass]="{
          'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50': notificationType() === 'success',
          'bg-rose-950/80 text-rose-300 border border-rose-800/50': notificationType() === 'error'
        }"
      >
        <span>{{ notificationMessage() }}</span>
        <button (click)="notificationMessage.set(null)" class="text-zinc-400 hover:text-white ml-2">×</button>
      </div>
    }
  `,
})
export class FilterBarComponent {
  private readonly movieStore = inject(MovieStore);

  @ViewChild('fileInput') private fileInputRef!: ElementRef<HTMLInputElement>;

  protected readonly filters = this.movieStore.filters;
  protected readonly availableGenres = this.movieStore.availableGenres;

  protected readonly notificationMessage = signal<string | null>(null);
  protected readonly notificationType = signal<'success' | 'error'>('success');

  public onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.movieStore.setSearchQuery(value);
  }

  public clearSearch(): void {
    this.movieStore.setSearchQuery('');
  }

  public onGenreSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.movieStore.setSelectedGenre(value);
  }

  public onSortSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as SortOption;
    this.movieStore.setSortBy(value);
  }

  public exportBackup(): void {
    const json = this.movieStore.exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split('T')[0];

    const link = document.createElement('a');
    link.href = url;
    link.download = `fichero-cinefilo-${dateStr}.json`;
    link.click();
    URL.revokeObjectURL(url);

    this.showNotification('¡Copia de seguridad descargada exitosamente en formato JSON!', 'success');
  }

  public triggerFileInput(): void {
    this.fileInputRef?.nativeElement.click();
  }

  public onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = this.movieStore.importData(content);
      if (success) {
        this.showNotification('¡Fichero restaurado con éxito desde el archivo JSON!', 'success');
      } else {
        this.showNotification('El archivo seleccionado no tiene el formato válido de películas.', 'error');
      }
      target.value = ''; // Reset input
    };
    reader.onerror = () => {
      this.showNotification('Ocurrió un error al leer el archivo.', 'error');
      target.value = '';
    };
    reader.readAsText(file);
  }

  public resetToDefaultMock(): void {
    if (confirm('¿Deseas restablecer el fichero con las películas de ejemplo iniciales?')) {
      this.movieStore.resetToDefaultMock();
      this.showNotification('Se restauró el catálogo a las 12 películas semilla.', 'success');
    }
  }

  private showNotification(msg: string, type: 'success' | 'error'): void {
    this.notificationMessage.set(msg);
    this.notificationType.set(type);
    setTimeout(() => {
      if (this.notificationMessage() === msg) {
        this.notificationMessage.set(null);
      }
    }, 4000);
  }
}
