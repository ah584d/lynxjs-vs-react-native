import { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GENRES_FILTER, YEARS_FILTER } from '@fennex-sand/constants';
import { useDebounce, useMovieStore } from '@fennex-sand/hooks';
import { API_KEY, IS_ANDROID } from '@/common/constants';
import { Filter } from './Filter';
import { SearchBar } from './SearchBar';

interface FiltersSectionProps {
  genreFilter: number | undefined;
  yearFilter: number;
  onFilterGenreChange: (activeIndex: number) => void;
  onFilterYearChange: (activeIndex: number) => void;
}

export const FiltersSection = (props: FiltersSectionProps): ReactElement => {
  const { genreFilter, yearFilter, onFilterGenreChange, onFilterYearChange } = props;

  const [searchText, setSearchText] = useState('');
  const debouncedQuery = useDebounce(searchText, 300);

  const searchMovies = useMovieStore(state => state.searchMovies);
  const clearSearchResults = useMovieStore(state => state.clearSearchResults);
  const searchResults = useMovieStore(state => state.searchResults);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchMovies(API_KEY, debouncedQuery);
    } else {
      clearSearchResults();
    }
  }, [debouncedQuery, searchMovies, clearSearchResults]);

  // const moviesToDisplay = searchText.trim() ? searchResults : moviesList;

  return (
    <View style={[styles.header, IS_ANDROID ? { flex: 0.2 } : null]}>
      <SearchBar value={searchText} onChangeText={setSearchText} />
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
