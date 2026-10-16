export type WatchStatus = 'VISTA' | 'POR_VER' | 'VIENDO_AHORA';

export type TabFilter = 'ALL' | 'VISTA' | 'POR_VER' | 'FAVORITAS';

export type SortOption =
  | 'TITLE_ASC'
  | 'TITLE_DESC'
  | 'YEAR_DESC'
  | 'YEAR_ASC'
  | 'RATING_DESC'
  | 'RECENT_ADDED';

export interface MovieReview {
  rating: number; // Escala 1 a 5 estrellas
  watchedDate?: string; // Formato YYYY-MM-DD
  userNotes?: string; // Comentarios personales o anécdotas de visionado
  platformOrCinema?: string; // Ej: "Cine", "Netflix", "HBO Max", "Blu-ray"
}

export interface Movie {
  id: string;
  catalogNumber: string; // Identificador de fichero tipo archivo (ej: "#FILM-001")
  title: string;
  originalTitle?: string;
  year: number;
  director: string;
  genres: string[];
  durationMinutes: number;
  synopsis: string;
  posterUrl: string;
  backdropUrl?: string;
  isFavorite: boolean;
  status: WatchStatus;
  review?: MovieReview;
  imdbScore?: number;
  createdAt: string;
}

export interface MovieFilterState {
  searchQuery: string;
  statusTab: TabFilter;
  selectedGenre: string;
  sortBy: SortOption;
}

export interface CatalogStats {
  total: number;
  watched: number;
  pending: number;
  favorites: number;
  watchedPercentage: number;
  totalWatchedHours: number;
}
