import axios from 'axios';
import { Movie, MovieDetails } from '@/types/common.types';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const movieService = {
  async getMovies(url: string): Promise<Movie[]> {
    const response = await axios.get(url);
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
