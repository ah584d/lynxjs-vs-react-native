import { create } from 'zustand';
import mock from '@/__mocks__/movie.mock.json';
import { getUrl } from '@/services/utils';
import { Movie } from '@/types/common.types';

interface MovieStore {
  popularMovies: Movie[];
  searchResults: Movie[];
  isLoading: boolean;
  error: string | null;
  filter: string | null;
  fetchPopularMovies: (page: number, year?: string, genreId?: number) => Promise<void>;
  searchMovies: (query: string) => void;
  setFilter: (filter: string | null) => void;
  setIsLoading: (status: boolean) => void;
}

export const useMovieStore = create<MovieStore>((set: any, get: any) => ({
  popularMovies: [],
  searchResults: [],
  isLoading: false,
  error: null,
  filter: null,

  fetchPopularMovies: async (page: number, year?: string, genreId?: number) => {
    set({ isLoading: true, error: null });
    try {
      const url = getUrl(page, year, genreId);
      console.log(`====> DEBUG url: `, url);
      const response = await fetch(url);
      const data = await response.json();

      set({ popularMovies: data.results, isLoading: false });
      //set({ popularMovies: mock.results, isLoading: false });
    } catch (e) {
      console.log('Error occurred while fetching movies:', e);
      set({ error: 'Failed to fetch movies', isLoading: false });
    }
  },

  searchMovies: (query: string) => {
    const { popularMovies } = get();
    if (!query) {
      set({ searchResults: [] });
      return;
    }
    const results = popularMovies.filter((movie: Movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
    set({ searchResults: results });
  },

  setFilter: (filter: string | null) => {
    set({ filter });
    const { popularMovies } = get();
    if (!filter) {
      set({ searchResults: [] });
      return;
    }
    const results = {} as any; //  popularMovies.filter((movie: Movie) => movie.genre && movie.genre.toLowerCase() === filter.toLowerCase());
    set({ searchResults: results });
  },

  setIsLoading: (status: boolean) => {
    set({ isLoading: status });
  },
}));
