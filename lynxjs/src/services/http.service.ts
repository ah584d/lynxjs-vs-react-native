import { API_KEY, TMDB_BASE_URL } from '@/common/constants.js';

export const fetchMovies = async (year: string, genreId: number | null, page: number) => {
  try {
    let url = `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`;
    if (year !== 'all') {
      const yearStart = parseInt(year);
      const yearEnd = yearStart; //yearStart + 9;
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
