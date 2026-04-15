import { Dispatch, type ReactElement, SetStateAction } from '@lynx-js/react';
import { runOnBackground } from '@lynx-js/react';
import { GENRES_FILTER, YEARS_FILTER } from '@fennex-sand/constants';
import classNames from 'classnames';
import { Filter } from '../Filter/LX_Filter';
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

  return (
    <view className={styles['filter-container']}>
      <view className={styles['filter-section']}>
        <view className={styles['filter-options']}>
          <Filter currentSelection={genreFilter} filters={GENRES_FILTER} onFilterChange={onFilterGenreChange} />
        </view>
      </view>
      <view className={styles['filter-section']}>
        <view className={styles['filter-options-year']}>
          <Filter currentSelection={yearFilter} filters={YEARS_FILTER} onFilterChange={onFilterYearChange} />
        </view>
      </view>
    </view>
  );
};
