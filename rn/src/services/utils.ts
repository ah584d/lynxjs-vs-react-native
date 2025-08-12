import { API_KEY, TMDB_BASE_URL } from '@/common/constants';

export function getUrl(page: number, year?: string, genreId?: number): string {
  let url = `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
  if (genreId) {
    url += `&with_genres=${genreId}`;
  }

  if (year && year !== 'all') {
    const yearStart = parseInt(year);
    const yearEnd = yearStart + 9;
    url += `&primary_release_date.gte=${yearStart}-01-01&primary_release_date.lte=${yearEnd}-12-31`;
  }
  return url;
}
