import { GENRE_MAP_INVERTED } from '@/common/LX_constants.js';
import type { Movie } from '@fennex-sand/types';

export function getUniqueMoviesById(movies: Movie[]): Movie[] {
  const seen = new Set<number>();
  const uniqueMovies = movies.filter(movie => {
    if (seen.has(movie.id)) {
      return false;
    }
    seen.add(movie.id);
    return true;
  });
  return uniqueMovies.sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0));
}

export const getGenreNames = (genreIds: number[]): string => {
  // if (!genreIds || genreIds.length === 0) {
  //   return 'Unknown';
  // }

  // return genreIds.map(id => GENRE_MAP[id] || 'Unknown').join(', ');

   if (!genreIds || genreIds.length === 0) {
    return 'Unknown';
  }

  return genreIds.map(id => GENRE_MAP_INVERTED[id] || 'Unknown').join(', ');
};

export const getMoviesByRating = (moviesList: Movie[]): Movie[] => {
  return moviesList?.sort((a, b) => b.vote_average - a.vote_average);
};
