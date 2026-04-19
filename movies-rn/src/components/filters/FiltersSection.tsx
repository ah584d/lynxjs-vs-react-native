import { Dispatch, ReactElement, SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native';
import { GENRES_FILTER, YEARS_FILTER } from '@fennex-sand/constants';
import { useSearchMovies } from '@fennex-sand/hooks';
import { API_KEY, IS_ANDROID } from '@/common/constants';
import { Filter } from './Filter';
import { SearchBar } from './SearchBar';

interface FiltersSectionProps {
  genreFilter: number | undefined;
  yearFilter: number;
  searchText: string;
  onFilterGenreChange: (activeIndex: number) => void;
  onFilterYearChange: (activeIndex: number) => void;
  onSearchTextChange: Dispatch<SetStateAction<string>>;
}

export const FiltersSection = (props: FiltersSectionProps): ReactElement => {
  const { genreFilter, yearFilter, searchText, onFilterGenreChange, onFilterYearChange, onSearchTextChange } = props;

  useSearchMovies(searchText, API_KEY);

  return (
    <View style={[styles.header, IS_ANDROID ? { flex: 0.2 } : null]}>
      <SearchBar value={searchText} onChangeText={onSearchTextChange} />
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
