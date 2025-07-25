import { Movie, MovieDetails } from '@/types/common.types';
import axios from 'axios';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const MovieService = {
  async getPopularMovies(): Promise<Movie[]> {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    return response.data.results;
  },

  async searchMovies(query: string): Promise<Movie[]> {
    const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    return response.data.results;
  },

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    return response.data;
  },
};
