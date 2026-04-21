import { Dispatch, type ReactElement, SetStateAction } from '@lynx-js/react';
import { GENRES_FILTER, YEARS_FILTER } from '@fennex-sand/constants';
import { useSearchMovies } from '@fennex-sand/hooks';
import classNames from 'classnames';
import { API_KEY } from '@/common/LX_constants';
import { Filter } from './Filter/LX_Filter';
import { SearchBar } from './SearchBar/LX_SearchBar';
import styles from './filtersSection.module.scss';

interface FiltersSectionProps {
  genreFilter: number | undefined;
  yearFilter: number;
  searchText: string;
  onFilterGenreChange: (activeIndex: number) => () => void;
  onFilterYearChange: (activeIndex: number) => () => void;
  onSearchTextChange: Dispatch<SetStateAction<string>>;
}

export const FiltersSection = (props: FiltersSectionProps): ReactElement => {
  const { genreFilter, yearFilter, searchText, onFilterGenreChange, onFilterYearChange, onSearchTextChange } = props;

  useSearchMovies(searchText, API_KEY);

  return (
    <>
      <SearchBar value={searchText} onChangeText={onSearchTextChange} />
      <view className={styles['filter-section']}>
        <view className={styles['filter-options']}>
          <Filter currentSelection={genreFilter} filters={GENRES_FILTER} onFilterChange={onFilterGenreChange} />
        </view>
      </view>
      <view className={styles['filter-section']}>
        <view className={classNames(styles['filter-options'], styles['filter-options-year'])}>
          <Filter currentSelection={yearFilter} filters={YEARS_FILTER} onFilterChange={onFilterYearChange} />
        </view>
      </view>
    </>
  );
};
