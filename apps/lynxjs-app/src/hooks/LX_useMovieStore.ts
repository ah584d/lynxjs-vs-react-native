import { getUrl, movieService } from '@fennex-sand/services';
import { getMoviesByRating } from '@fennex-sand/services';
import { type Movie } from '@fennex-sand/types';
import { create } from 'zustand';
import { ALL, API_KEY, GENRES_FILTER, GENRE_MAP, YEARS_FILTER } from '@/common/LX_constants.js';

interface MovieStore {
  moviesList: Movie[];
  isLoading: boolean;
  error: string | null;
  filter: string | null;
}

interface MovieAction {
  getMovies: (page: number, year?: number, genreId?: number) => Promise<void>;
  resetList: () => Promise<void>;
}

export const useMovieStore = create<MovieStore & MovieAction>((set, get) => ({
  moviesList: [],
  isLoading: false,
  error: null,
  filter: null,

  getMovies: async (page: number, yearFilter?: number, genreFilter?: number) => {
    set({ isLoading: true, error: null });
    const year = yearFilter !== undefined ? YEARS_FILTER[yearFilter] : ALL;
    const genre = genreFilter && GENRE_MAP[GENRES_FILTER[genreFilter]];
    try {
      const url = getUrl(API_KEY, page, year, genre);
      const response = await movieService.fetchMovies(url);
      const sortedMovies = getMoviesByRating(response);

      // reset list if needed
      const existingMovies = get().moviesList;
      if (page === 1 && existingMovies.length > 0) {
        set({ moviesList: [] });
      }
      // if this is a next page, we merge new results with existing one
      const movies = page > 1 ? [...existingMovies, ...sortedMovies] : sortedMovies;

      set({ moviesList: movies, isLoading: false });
    } catch (e) {
      console.log('Error occurred while fetching movies:', e instanceof Error ? e.message : e);
      set({ error: 'Failed to fetch movies', isLoading: false });
    }
  },
  resetList: async () => set({ moviesList: [] }),
}));
