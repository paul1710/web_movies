import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieStore } from '../../core/services/movie.store';

@Component({
  selector: 'app-stats-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="w-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 shadow-xl text-zinc-100"
    >
      <!-- Cabecera de Estadísticas -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 class="text-sm font-semibold tracking-wider uppercase text-zinc-400">
              Expediente Cinéfilo
            </h2>
            <p class="text-xs text-zinc-500">Métricas en tiempo real de tu videoteca personal</p>
          </div>
        </div>

        <!-- Indicador de Porcentaje Global -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-zinc-400">Completado:</span>
          <span class="text-base font-bold font-mono text-emerald-400">
            {{ stats().watchedPercentage }}%
          </span>
        </div>
      </div>

      <!-- Barra de Progreso de Visionado -->
      <div class="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-5">
        <div
          class="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out"
          [style.width.%]="stats().watchedPercentage"
        ></div>
      </div>

      <!-- Cuadrícula de Métricas Clave -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <!-- 1. Total Archivadas -->
        <div class="bg-zinc-800/40 border border-zinc-800 rounded-xl p-3 flex flex-col">
          <span class="text-[11px] text-zinc-400 uppercase font-medium tracking-wider">Archivadas</span>
          <div class="flex items-baseline gap-1 mt-1">
            <span class="text-2xl font-bold font-mono text-white">{{ stats().total }}</span>
            <span class="text-xs text-zinc-500">fichas</span>
          </div>
        </div>

        <!-- 2. Vistas -->
        <div class="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-3 flex flex-col">
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-emerald-400 uppercase font-medium tracking-wider">Vistas</span>
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <div class="flex items-baseline gap-1 mt-1">
            <span class="text-2xl font-bold font-mono text-emerald-300">{{ stats().watched }}</span>
            <span class="text-xs text-emerald-500/80">pelis</span>
          </div>
        </div>

        <!-- 3. Pendientes (Por Ver) -->
        <div class="bg-amber-950/20 border border-amber-900/30 rounded-xl p-3 flex flex-col">
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-amber-400 uppercase font-medium tracking-wider">Por Ver</span>
            <span class="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
          </div>
          <div class="flex items-baseline gap-1 mt-1">
            <span class="text-2xl font-bold font-mono text-amber-300">{{ stats().pending }}</span>
            <span class="text-xs text-amber-500/80">en lista</span>
          </div>
        </div>

        <!-- 4. Favoritas -->
        <div class="bg-rose-950/20 border border-rose-900/30 rounded-xl p-3 flex flex-col">
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-rose-400 uppercase font-medium tracking-wider">Favoritas</span>
            <svg class="w-3.5 h-3.5 text-rose-500 fill-current" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </div>
          <div class="flex items-baseline gap-1 mt-1">
            <span class="text-2xl font-bold font-mono text-rose-300">{{ stats().favorites }}</span>
            <span class="text-xs text-rose-500/80">joyas</span>
          </div>
        </div>

        <!-- 5. Horas Vistas Acumuladas -->
        <div class="col-span-2 sm:col-span-1 bg-zinc-800/40 border border-zinc-800 rounded-xl p-3 flex flex-col">
          <span class="text-[11px] text-zinc-400 uppercase font-medium tracking-wider">Tiempo Cine</span>
          <div class="flex items-baseline gap-1 mt-1">
            <span class="text-2xl font-bold font-mono text-cyan-300">{{ stats().totalWatchedHours }}</span>
            <span class="text-xs text-zinc-500">horas</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StatsSummaryComponent {
  private readonly movieStore = inject(MovieStore);

  // Señal computada del MovieStore
  protected readonly stats = this.movieStore.stats;
}
