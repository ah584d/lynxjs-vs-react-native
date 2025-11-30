import { ALL, API_KEY, GENRES_FILTER, GENRE_MAP_, TMDB_BASE_URL, YEARS_FILTER } from '@/common/LX_constants.js';
import {} from '@/types/LX_common.types.js';
export function getUrl(page, year, genreId) {
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
    async fetchMovies(url) {
        const response = await fetch(url);
        const { results } = await response.json();
        return results;
    },
};
