import { GENRE_MAP_INVERTED } from '@/common/constants';
import { Movie } from '@/types/common.types';

export const getGenreNames = (genreIds: number[]): string => {
  if (!genreIds || genreIds.length === 0) {
    return 'Unknown';
  }

  return genreIds.map(id => GENRE_MAP_INVERTED[id] || 'Unknown').join(', ');
};

export const getMoviesByRating = (moviesList: Movie[]): Movie[] => {
  return moviesList.sort((a, b) => b.vote_average - a.vote_average);
};
