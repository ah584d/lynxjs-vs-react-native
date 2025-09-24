import { ALL, API_KEY, TMDB_BASE_URL } from '@/common/constants.js';
import { type IMovie } from '@/types/common.types.js';

export function getUrl(page: number, year?: string, genreId?: number): string {
  let url = `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`;

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
  async getMovies(url: string): Promise<IMovie[]> {
    const response = await fetch(url);
    return response.json();
  },
};

export const fetchMovies = async (page: number, year: string, genreId: number | null) => {
  try {
    let url = `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`;
    if (year !== 'all') {
      const yearStart = parseInt(year);
      const yearEnd = yearStart;
      url += `&primary_release_date.gte=${yearStart}-01-01&primary_release_date.lte=${yearEnd}-12-31`;
    }
    if (genreId !== null) {
      url += `&with_genres=${genreId}`;
    }

    url += `&page=${page}`;

    console.log(`====> DEBUG lynxjs url: `, url);
    const response = await fetch(url);
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
