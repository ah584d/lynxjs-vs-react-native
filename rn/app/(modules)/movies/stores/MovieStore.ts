import { makeAutoObservable } from 'mobx';
import { Movie, MovieDetails, MovieService } from '../services/MovieService';

export class MovieStore {
  popularMovies: Movie[] = [];
  searchResults: Movie[] = [];
  selectedMovie: MovieDetails | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPopularMovies() {
    this.isLoading = true;
    this.error = null;
    try {
      this.popularMovies = await MovieService.getPopularMovies();
    } catch (err) {
      this.error = 'Failed to fetch popular movies';
    } finally {
      this.isLoading = false;
    }
  }

  async searchMovies(query: string) {
    if (!query) {
      this.searchResults = [];
      return;
    }

    this.isLoading = true;
    this.error = null;
    try {
      this.searchResults = await MovieService.searchMovies(query);
    } catch (err) {
      this.error = 'Failed to search movies';
    } finally {
      this.isLoading = false;
    }
  }

  async fetchMovieDetails(movieId: number) {
    this.isLoading = true;
    this.error = null;
    try {
      this.selectedMovie = await MovieService.getMovieDetails(movieId);
    } catch (err) {
      this.error = 'Failed to fetch movie details';
    } finally {
      this.isLoading = false;
    }
  }
}

// Singleton instance of MovieStore
const movieStore = new MovieStore();

// Simple hook to access the singleton store
export function useMovieStore() {
  return movieStore;
}
