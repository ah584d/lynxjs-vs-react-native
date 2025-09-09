import { GENRE_MAP_INVERTED } from '@/common/constants';

export const getGenreNames = (genreIds: number[]): string => {
  if (!genreIds || genreIds.length === 0) {
    return 'Unknown';
  }

  return genreIds.map(id => GENRE_MAP_INVERTED[id] || 'Unknown').join(', ');
};
