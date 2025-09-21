import { GENRE_MAP } from '@/common/constants.js';
import type { IMovie } from '@/types/common.types.js';

export function getUniqueMoviesById(movies: IMovie[]): IMovie[] {
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
  if (!genreIds || genreIds.length === 0) {
    return 'Unknown';
  }

  return genreIds.map(id => GENRE_MAP[id] || 'Unknown').join(', ');
};
