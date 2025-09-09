import { create } from 'zustand';
import { movieService } from '@/services/http.service';
import { getUrl } from '@/services/utils';
import { Movie } from '@/types/common.types';

interface MovieStore {
  moviesList: Movie[];
  searchResults: Movie[];
  isLoading: boolean;
  error: string | null;
  filter: string | null;
}

interface MovieAction {
  getMovies: (page: number, year?: string, genreId?: number) => Promise<void>;
}

export const useMovieStore = create<MovieStore & MovieAction>((set, get) => ({
  moviesList: [],
  searchResults: [],
  isLoading: false,
  error: null,
  filter: null,

  getMovies: async (page: number, year?: string, genreId?: number) => {
    set({ isLoading: true, error: null });
    try {
      const url = getUrl(page, year, genreId);
      const response = await movieService.getMovies(url);

      // if this is a next page, we merge new results with existing one
      const existingMovies = get().moviesList;
      const movies = page > 1 ? [...existingMovies, ...response] : response;
      set({ moviesList: movies, isLoading: false });
    } catch (e) {
      console.log('Error occurred while fetching movies:', e);
      set({ error: 'Failed to fetch movies', isLoading: false });
    }
  },
}));
