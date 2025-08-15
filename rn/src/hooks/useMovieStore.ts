import { create } from 'zustand';
import mock_1 from '@/__mocks__/movies_1.mock.json';
import mock_2 from '@/__mocks__/movies_2.mock.json';
import { MovieService } from '@/services/movie.service';
import { getUrl } from '@/services/utils';
import { Movie } from '@/types/common.types';

interface MovieStore {
  moviesList: Movie[];
  searchResults: Movie[];
  isLoading: boolean;
  error: string | null;
  filter: string | null;
}

type MovieAction = {
  fetchMovies: (page: number, year?: string, genreId?: number) => Promise<void>;
  searchMovies: (query: string) => void;
  setFilter: (filter: string | null) => void;
  setIsLoading: (status: boolean) => void;
};

export const useMovieStore = create<MovieStore & MovieAction>((set, get) => ({
  moviesList: [],
  searchResults: [],
  isLoading: false,
  error: null,
  filter: null,

  fetchMovies: async (page: number, year?: string, genreId?: number) => {
    set({ isLoading: true, error: null });
    try {
      const url = getUrl(page, year, genreId);
      const response = /*page !== 2 ? mock_1.results : mock_2.results;*/  await MovieService.getMovies(url);

      // if this is a next page, we merge new results with existing one
      const existingMovies = get().moviesList;
      const movies = page > 1 ? [...existingMovies, ...response] : response;
      set({ moviesList: movies, isLoading: false });
    } catch (e) {
      console.log('Error occurred while fetching movies:', e);
      set({ error: 'Failed to fetch movies', isLoading: false });
    }
  },

  searchMovies: (query: string) => {
    const { moviesList } = get();
    if (!query) {
      set({ searchResults: [] });
      return;
    }
    const results = moviesList.filter((movie: Movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
    set({ searchResults: results });
  },

  setFilter: (filter: string | null) => {
    set({ filter });
    const { moviesList } = get();
    if (!filter) {
      set({ searchResults: [] });
      return;
    }
    const results = {} as any; //  moviesList.filter((movie: Movie) => movie.genre && movie.genre.toLowerCase() === filter.toLowerCase());
    set({ searchResults: results });
  },

  setIsLoading: (status: boolean) => {
    set({ isLoading: status });
  },
}));
