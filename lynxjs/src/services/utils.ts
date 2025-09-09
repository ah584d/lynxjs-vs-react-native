import { GENRE_MAP } from '@/common/constants.js';
import type { IMovie } from '@/types/common.types.js';

export function getUniqueMoviesById(movies: IMovie[]): IMovie[] {
  const seen = new Set<number>();
  return movies.filter(movie => {
    if (seen.has(movie.id)) {
      return false;
    }
    seen.add(movie.id);
    return true;
  });
}


export const getGenreNames = (genreIds: number[]): string => {
    if (!genreIds || genreIds.length === 0) {
      return 'Unknown';
    }

    return genreIds.map(id => GENRE_MAP[id] || 'Unknown').join(', ');
  };
