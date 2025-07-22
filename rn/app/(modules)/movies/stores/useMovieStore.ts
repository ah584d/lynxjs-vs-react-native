import { API_KEY, TMDB_BASE_URL } from '@/common/constants';
import { create } from 'zustand';

export interface Movie {
  id: number;
  title: string;
  rating: number;
  releaseDate: string;
  overview: string;
  posterUrl: string;
  genre?: string;
}

interface MovieStore {
  popularMovies: Movie[];
  searchResults: Movie[];
  isLoading: boolean;
  error: string | null;
  filter: string | null;
  fetchPopularMovies: () => Promise<void>;
  searchMovies: (query: string) => void;
  setFilter: (filter: string | null) => void;
}

export const useMovieStore = create<MovieStore>((set: any, get: any) => ({
  popularMovies: [],
  searchResults: [],
  isLoading: false,
  error: null,
  filter: null,

  fetchPopularMovies: async (page?: number) => {
    set({ isLoading: true, error: null });
    console.log(`====> DEBUG TMDBBASEURL: `, TMDB_BASE_URL, API_KEY);
    try {
      let url = `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false${page ? `&page=${page}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(`====> DEBUG response: `, data);
      set({ popularMovies: data.results, isLoading: false });
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
    const results = popularMovies.filter((movie: Movie) => movie.genre && movie.genre.toLowerCase() === filter.toLowerCase());
    set({ searchResults: results });
  },
}));
