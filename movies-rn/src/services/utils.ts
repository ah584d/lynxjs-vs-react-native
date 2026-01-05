import { GENRE_MAP_INVERTED } from '@/common/constants';
import { Movie } from '@fennex-sand/types';

export const getGenreNames = (genreIds: number[]): string => {
  if (!genreIds || genreIds.length === 0) {
    return 'Unknown';
  }

  return genreIds.map(id => GENRE_MAP_INVERTED[id] || 'Unknown').join(', ');
};

export const getMoviesByRating = (moviesList: Movie[]): Movie[] => {
  return moviesList.sort((a, b) => b.vote_average - a.vote_average);
};

export function getPosterUrl(posterPath: string): string {
  return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'https://via.placeholder.com/500x750?text=No+Poster';
}
