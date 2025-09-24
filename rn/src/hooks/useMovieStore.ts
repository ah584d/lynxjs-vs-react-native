import { create } from 'zustand';
import { ALL, GENRES_FILTER, GENRE_MAP, YEARS_FILTER } from '@/common/constants';
import { getUrl, movieService } from '@/services/http.service';
import { getMoviesByRating } from '@/services/utils';
import { Movie } from '@/types/common.types';

interface MovieStore {
  moviesList: Movie[];
  searchResults: Movie[];
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
  searchResults: [],
  isLoading: false,
  error: null,
  filter: null,

  getMovies: async (page: number, yearFilter?: number, genreFilter?: number) => {
    set({ isLoading: true, error: null });
    const year = yearFilter !== undefined ? YEARS_FILTER[yearFilter] : ALL;
    const genre = genreFilter && GENRE_MAP[GENRES_FILTER[genreFilter]];
    try {
      const url = getUrl(page, year, genre);
      const response = await movieService.getMovies(url);
      const sortedMovies = getMoviesByRating(response);

      // if this is a next page, we merge new results with existing one
      const existingMovies = get().moviesList;
      const movies = page > 1 ? [...existingMovies, ...sortedMovies] : sortedMovies;
      set({ moviesList: movies, isLoading: false });
    } catch (e) {
      console.log('Error occurred while fetching movies:', e);
      set({ error: 'Failed to fetch movies', isLoading: false });
    }
  },
  resetList: async () => set({ moviesList: [] }),
}));
