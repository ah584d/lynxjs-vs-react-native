import { type ReactElement } from '@lynx-js/react';
import { GENRES_FILTER } from '@/common/LX_constants.js';
import { t } from '@/i18n/i18n.js';
import styles from './filter.module.scss';

interface FilterProps {
  filters: (number | string | null)[];
  onFilterChange: (activeIndex: number) => () => void;
  currentSelection?: number;
}
export const Filter = ({ filters, onFilterChange, currentSelection }: FilterProps): ReactElement => {
  return (
    <view className={styles['filter-container']}>
      {filters.map((filter, index) => {
        const isSelected = index === currentSelection;
        console.log(`====> DEBUG isSelected: `, isSelected);
        return (
          <view className={isSelected ? styles['filter-button-active'] : styles['filter-button']} bindtap={onFilterChange(index)} key={filter || `all-${index}`}>
            <text>{filter}</text>
          </view>
        );
      })}
    </view>
  );
};
