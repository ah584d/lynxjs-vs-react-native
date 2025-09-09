import { ALL, API_KEY, GENRE_MAP_INVERTED, TMDB_BASE_URL } from '@/common/constants';

export function getUrl(page: number, year?: string, genreId?: number): string {
  let url = `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`;

  if (year && year !== ALL) {
    const yearStart = parseInt(year);
    const yearEnd = yearStart + 9;
    url += `&primary_release_date.gte=${yearStart}-01-01&primary_release_date.lte=${yearEnd}-12-31`;
  }
  if (genreId) {
    url += `&with_genres=${genreId}`;
  }

  url += `&page=${page}`;
  console.log(`====> DEBUG url: `, url, 'page:', page, 'year:', year, 'genreId:', genreId);
  return url;
}

export const getGenreNames = (genreIds: number[]): string => {
  if (!genreIds || genreIds.length === 0) {
    return 'Unknown';
  }

  return genreIds.map(id => GENRE_MAP_INVERTED[id] || 'Unknown').join(', ');
};
