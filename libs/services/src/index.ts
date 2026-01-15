import { ALL, GENRE_MAP_INVERTED, TMDB_BASE_URL } from '@fennex-sand/constants';
import { type Movie } from '@fennex-sand/types';

export function getUrl(apiKey: string, page: number, year?: string, genreId?: number): string {
  let url = `${TMDB_BASE_URL}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`;

  if (year && year !== ALL) {
    const yearStart = parseInt(year);
    const yearEnd = yearStart;
    url += `&primary_release_date.gte=${yearStart}-01-01&primary_release_date.lte=${yearEnd}-12-31`;
  }
  if (genreId) {
    url += `&with_genres=${genreId}`;
  }

  url += `&page=${page}`;
  console.log(`====> DEBUG url: `, url, 'page:', page, 'year:', year, 'genreId:', genreId);
  return url;
}

export const movieService = {
  async fetchMovies(url: string): Promise<Movie[]> {
    const response = await fetch(url);
    const { results } = await response.json();
    return results;
  },
};

export function getMoviesByRating(moviesList: Movie[]): Movie[] {
  return moviesList?.sort((a, b) => b.vote_average - a.vote_average);
}

export function getGenreNames(genreIds: number[]): string {
  if (!genreIds || genreIds.length === 0) {
    return 'Unknown';
  }

  return genreIds.map(id => GENRE_MAP_INVERTED[id] || 'Unknown').join(', ');
}

export function getPosterUrl(posterPath: string): string {
  return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'https://via.placeholder.com/500x750?text=No+Poster';
}
