import { ALL, GENRES_FILTER, GENRE_MAP, TMDB_BASE_URL, YEARS_FILTER } from '@fennex-sand/constants';
import { getMoviesByRating, getSearchUrl, getUrl, movieService } from '@fennex-sand/services';
import { Movie } from '@fennex-sand/types';
import { create } from 'zustand';

export interface MovieStore {
  moviesList: Movie[];
  searchResults: Movie[];
  isLoading: boolean;
  error: string | null;
  filter: string | null;
  menuOpened: boolean;
}

export interface MovieAction {
  getMovies: (apiKey: string, page: number, yearFilter: number, genreFilter?: number) => Promise<void>;
  resetList: () => Promise<void>;
  setOpenMenu: (state: boolean) => Promise<void>;
  searchMovies: (apiKey: string, query: string, signal?: AbortSignal) => Promise<void>;
  clearSearchResults: () => void;
}

export interface MovieStoreState extends MovieStore, MovieAction {}

export const useMovieStore = create<MovieStoreState>((set, get) => ({
  moviesList: [],
  searchResults: [],
  isLoading: false,
  error: null,
  filter: null,
  menuOpened: false,

  setOpenMenu: async (state: boolean) => set({ menuOpened: state }),

  getMovies: async (apiKey: string, page: number, yearFilter: number, genreFilter?: number) => {
    set({ isLoading: true, error: null });
    const year = yearFilter !== undefined ? YEARS_FILTER[yearFilter] : ALL;
    const genre = genreFilter && GENRE_MAP[GENRES_FILTER[genreFilter]];
    try {
      const url = getUrl(apiKey, page, year, genre);
      const response = await movieService.fetchMovies(url);
      const sortedMovies = getMoviesByRating(response);

      // if this is a next page, we merge new results with existing one
      const existingMovies = get().moviesList;

      // reset list if needed does this case relevant??
      if (page === 1 && existingMovies.length > 0) {
        set({ moviesList: [] });
      }

      const movies = page > 1 ? [...existingMovies, ...sortedMovies] : sortedMovies;
      set({ moviesList: movies, isLoading: false });
    } catch (e) {
      console.log('Error occurred while fetching movies:', e instanceof Error ? e.message : e);
      set({ error: 'Failed to fetch movies', isLoading: false });
    }
  },
  resetList: async () => set({ moviesList: [] }),

  searchMovies: async (apiKey: string, query: string, signal?: AbortSignal) => {
    set({ isLoading: true, error: null });
    try {
      const url = getSearchUrl(apiKey, query);
      const response = await movieService.fetchMovies(url, signal);
      const sortedMovies = getMoviesByRating(response);
      set({ searchResults: sortedMovies, isLoading: false });
    } catch (e) {
      // Don't set error state if the request was aborted
      if (e instanceof Error && e.name === 'AbortError') {
        console.log('Search request was aborted');
        return;
      }
      console.log('Error occurred while searching movies:', e instanceof Error ? e.message : e);
      set({ error: 'Failed to search movies', isLoading: false });
    }
  },

  clearSearchResults: () => set({ searchResults: [] }),
}));
