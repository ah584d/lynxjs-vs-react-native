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

export const useMovieStore = create<MovieStore>((set, get) => ({
  popularMovies: [],
  searchResults: [],
  isLoading: false,
  error: null,
  filter: null,

  fetchPopularMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      // Replace with your real API call
      const response = await fetch('https://api.example.com/movies/popular');
      const data = await response.json();
      set({ popularMovies: data.results, isLoading: false });
    } catch (e) {
      set({ error: 'Failed to fetch movies', isLoading: false });
    }
  },

  searchMovies: (query: string) => {
    const { popularMovies } = get();
    if (!query) {
      set({ searchResults: [] });
      return;
    }
    const results = popularMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    set({ searchResults: results });
  },

  setFilter: (filter: string | null) => {
    set({ filter });
    const { popularMovies } = get();
    if (!filter) {
      set({ searchResults: [] });
      return;
    }
    const results = popularMovies.filter(movie =>
      movie.genre && movie.genre.toLowerCase() === filter.toLowerCase()
    );
    set({ searchResults: results });
  },
}));
