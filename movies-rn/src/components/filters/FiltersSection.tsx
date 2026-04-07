import { ReactElement, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GENRES_FILTER, YEARS_FILTER } from '@fennex-sand/constants';
import { useAbortController, useDebounce, useMovieStore } from '@fennex-sand/hooks';
import { API_KEY, IS_ANDROID } from '@/common/constants';
import { Filter } from './Filter';
import { SearchBar } from './SearchBar';

interface FiltersSectionProps {
  genreFilter: number | undefined;
  yearFilter: number;
  searchText: string;
  onFilterGenreChange: (activeIndex: number) => void;
  onFilterYearChange: (activeIndex: number) => void;
  onSearchTextChange: (searchText: string) => void;
}

export const FiltersSection = (props: FiltersSectionProps): ReactElement => {
  const { genreFilter, yearFilter, searchText, onFilterGenreChange, onFilterYearChange, onSearchTextChange } = props;

  const debouncedQuery = useDebounce(searchText, 500);
  const { getSignal, cleanup } = useAbortController();

  const searchMovies = useMovieStore(state => state.searchMovies);
  const clearSearchResults = useMovieStore(state => state.clearSearchResults);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      // Get a new signal, which automatically aborts any previous request
      const signal = getSignal();
      searchMovies(API_KEY, debouncedQuery, signal);
    } else {
      clearSearchResults();
    }

    return cleanup;
  }, [debouncedQuery, searchMovies, clearSearchResults, getSignal, cleanup]);

  const handleSearchTextChange = (text: string) => {
    onSearchTextChange(text);
  };

  return (
    <View style={[styles.header, IS_ANDROID ? { flex: 0.2 } : null]}>
      <SearchBar value={searchText} onChangeText={handleSearchTextChange} />
      <Filter currentSelection={genreFilter} filters={GENRES_FILTER} onFilterChange={onFilterGenreChange} />
      <Filter currentSelection={yearFilter} filters={YEARS_FILTER} onFilterChange={onFilterYearChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 8,
  },
});
