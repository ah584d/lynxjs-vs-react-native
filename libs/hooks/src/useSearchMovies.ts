import { useEffect } from 'react';
import { useAbortController } from './useAbortController';
import { useDebounce } from './useDebounce';
import { useMovieStore } from './useMovieStore';

/**
 * Custom hook to handle movie search with debouncing and abort controller
 * @param searchText - The search query text
 * @param apiKey - The API key for movie search
 */
export const useSearchMovies = (searchText: string, apiKey: string): void => {
  const debouncedQuery = useDebounce(searchText, 500);
  const { getSignal, cleanup } = useAbortController();

  const searchMovies = useMovieStore(state => state.searchMovies);
  const clearSearchResults = useMovieStore(state => state.clearSearchResults);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      // Get a new signal, which automatically aborts any previous request
      const signal = getSignal();
      searchMovies(apiKey, debouncedQuery, signal);
    } else {
      clearSearchResults();
    }

    return cleanup;
  }, [debouncedQuery, searchMovies, clearSearchResults, getSignal, cleanup, apiKey]);
};
