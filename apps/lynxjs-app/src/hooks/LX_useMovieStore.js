import { create } from 'zustand';
import { ALL, GENRES_FILTER, GENRE_MAP_, YEARS_FILTER } from '@/common/LX_constants.js';
import { getUrl, movieService } from '@/services/LX_http.service.js';
import { getMoviesByRating } from '@/services/LX_utils.js';
import {} from '@/types/LX_common.types.js';
export const useMovieStore = create((set, get) => ({
    moviesList: [],
    isLoading: false,
    error: null,
    filter: null,
    getMovies: async (page, yearFilter, genreFilter) => {
        set({ isLoading: true, error: null });
        const year = yearFilter !== undefined ? YEARS_FILTER[yearFilter] : ALL;
        const genre = genreFilter && GENRE_MAP_[GENRES_FILTER[genreFilter]];
        try {
            const url = getUrl(page, year, genre);
            const response = await movieService.fetchMovies(url);
            const sortedMovies = getMoviesByRating(response);
            // reset list if needed
            const existingMovies = get().moviesList;
            if (page === 1 && existingMovies.length > 0) {
                set({ moviesList: [] });
            }
            // if this is a next page, we merge new results with existing one
            const movies = page > 1 ? [...existingMovies, ...sortedMovies] : sortedMovies;
            set({ moviesList: movies, isLoading: false });
        }
        catch (e) {
            console.log('Error occurred while fetching movies:', e instanceof Error ? e.message : e);
            set({ error: 'Failed to fetch movies', isLoading: false });
        }
    },
    resetList: async () => set({ moviesList: [] }),
}));
